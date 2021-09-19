import { Bot as TelegramBot } from 'grammy'
import { Bot } from '../entity/bot'
import logger from '../logger'
import modules from '../modules'

type Module = {
	id: string
	ui: string
}
interface LoadedModules {
	[botId: number]: Module[]
}
class Bots {
	private bots: Bot[] = []
	loadedModules: LoadedModules = {}
	loadedBots: Bot[] = []

	async fetchBots() {
		const dbBots = await Bot.find()
		dbBots.forEach((bot) => this.bots.push(bot))
		return this.bots
	}

	async loadModule(id: number, moduleFunction: Function) {
		const bot = this.bots.find((props) => props.id === id)
	}

	async start(bot: TelegramBot) {
		const { botInfo } = bot
		this.loadedModules[botInfo.id] = []

		modules.map(({ id, ui }) => {
			this.loadedModules[botInfo.id].push({
				id,
				ui,
			})
		})

		console.log(this.loadedModules)
	}
	async stop(bot: TelegramBot) {
		logger.log('bot', `stopping ${bot.botInfo.id}`)
	}
}
export { Bots }
