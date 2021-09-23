import { Bot } from '../entity/bot'
import { Bot as TelegramBot, Composer } from 'grammy'
import modules from '../modules'
import {
	BMModuleHandler,
	BMModuleParams,
	BMModuleMeta,
	LoadedBots,
	BMContext,
} from '../types'
import { Module } from '../entity/module'
import { Command } from '../entity/command'
import { CommandHandler } from './Command'

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

	async loadModule(
		bot: TelegramBot<BMContext>,
		module: BMModule,
		moduleId: string
	) {
		const composer = new Composer<BMContext>()
		composer.use(async (ctx, next) => {
			if (!ctx.from?.id || !ctx.chat?.id) {
				return
			}

			const _module = await Module.findOne({
				where: { botId: bot.botInfo.id, moduleId },
			})

			if (!_module?.active) {
				return
			}

			ctx.session.config = _module?.config

			const { params } = module
			const scope = params?.scope || 'all'

			if (scope !== 'all') {
				if (scope == 'group') {
					if (ctx.chat.id === ctx.from.id) {
						return
					}
				}

				if (scope == 'private') {
					if (ctx.chat.id !== ctx.from.id) {
						return
					}
				}
			}

			next()
		})

		module.handler(composer, bot)
		bot.use(composer)
	}

	async start(bot: TelegramBot<BMContext>) {
		const { botInfo } = bot

		bot.command('bmid', (ctx) => {
			ctx.reply(
				JSON.stringify(ctx.message?.reply_to_message || {}, null, 2),
				{}
			)
		})

		const commands = await Command.find({ where: { bot: bot.botInfo.id } })

		commands.map((command: any) => {
			new CommandHandler(bot, command)
		})

		if (this.loadedBots[botInfo.id]) {
			if (this.loadedBots[botInfo.id].status) {
				return { error: 'already running' }
			}
		}
		this.loadedModules[botInfo.id] = []

		const installedModules = await Module.find({ where: { botId: botInfo.id } })

		installedModules.map((iModule) => {
			const module = modules[iModule.moduleId]
			if (!module) return
			// attach modules to telegram bot
			this.loadModule(bot, module.module, module.meta.id)
			this.loadedModules[botInfo.id].push(module.meta)
		})

		this.loadedBots[botInfo.id].status = true
		bot.start()
	}
}
export { Handler }
