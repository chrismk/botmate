import logger from '../logger'
import modules from '../modules'
import { Bot as TelegramBot, Composer } from 'grammy'
import { Bot } from '../entity/bot'
import { BMModuleHandler, BMModuleParams, BMModuleMeta } from '../types'

interface LoadedModules {
	[botId: number]: BMModuleMeta[]
}

class ModuleHandler {
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
	loadedBots: Bot[] = []

	async fetchBots() {
		const dbBots = await Bot.find()
		dbBots.forEach((bot) => this.bots.push(bot))
		return this.bots
	}

	async loadModule(bot: TelegramBot, module: ModuleHandler) {
		const composer = new Composer()

		composer.use(async (ctx, next: Function) => {
			next()
		})

		module.handler(composer)
		bot.use(composer)
	}

	async start(bot: TelegramBot) {
		const { botInfo } = bot
		this.loadedModules[botInfo.id] = []
		modules.map(({ meta, module }) => {
			// attach modules to telegram bot
			this.loadModule(bot, module)
			this.loadedModules[botInfo.id].push(meta)
		})

		bot.start()
	}
	async stop(bot: TelegramBot) {
		logger.log('bot', `stopping ${bot.botInfo.id}`)
	}
}
export { Handler }
