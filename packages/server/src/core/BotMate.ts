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
		const userBots = await this.fetchBots()
		userBots.map(async (bot) => {
			try {
				await bot.init()
				logger.info(`starting ${bot.botInfo.id}`)
			} catch (err: any) {
				logger.error(err)
			}
		})
	}
}

export { BotMate }
