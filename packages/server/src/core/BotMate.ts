import { Bot } from 'grammy'
import { Bots } from './Bots'
import logger from '../logger'

class BotMate extends Bots {
	bots: Bot[] = []

	constructor() {
		super()
		this.setup()
	}

	async setup() {
		try {
			const userBots = await this.fetchBots()
			userBots.map(async (bot) => {
				await bot.init()
				console.log(bot.botInfo)
			})
		} catch (err: any) {
			logger.error(err)
		}
	}
}

export { BotMate }
