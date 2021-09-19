import logger from '../logger'
import { Bot as TelegramBot, Composer } from 'grammy'
import { Bot } from '../entity/bot'
import modules from '../modules'
import {
	BMModuleHandler,
	BMModuleParams,
	BMModuleMeta,
	LoadedBots,
	BMContext,
} from '../types'
import { Module } from '../entity/module'

interface LoadedModules {
	[botId: number]: BMModuleMeta[]
}

class BMModule {
	handler: BMModuleHandler
	params?: BMModuleParams

	constructor(handler: BMModuleHandler, params?: BMModuleParams) {
		this.handler = handler
		this.params = params
	}
}

class Handler {
	private bots: Bot[] = []
	loadedModules: LoadedModules = {}
	loadedBots: LoadedBots = {}

	async fetchBots() {
		const dbBots = await Bot.find()
		dbBots.forEach((bot) => this.bots.push(bot))
		return this.bots
	}

	async loadModule(bot: TelegramBot<BMContext>, module: BMModule, config: any) {
		const composer = new Composer<BMContext>()

		composer.use(async (ctx: BMContext, next: Function) => {
			const _module = await Module.findOne({ where: { botId: bot.botInfo.id } })
			ctx.session.config = _module?.config
			next()
		})

		module.handler(composer, bot)
		bot.use(composer)
	}

	async start(bot: TelegramBot<BMContext>) {
		const { botInfo } = bot

		if (this.loadedBots[botInfo.id].status) {
			return { error: 'already running' }
		}

		const installedModules = await Module.find({ where: { botId: botInfo.id } })
		this.loadedModules[botInfo.id] = []

		installedModules.map((iModule) => {
			const module = modules[iModule.moduleId]
			// attach modules to telegram bot
			this.loadModule(bot, module.module, iModule.config)
			this.loadedModules[botInfo.id].push(module.meta)
		})

		this.loadedBots[botInfo.id].status = true
		bot.start()
	}
}
export { Handler }
