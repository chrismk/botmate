import { createConnection } from 'typeorm'
import { Bot as TelegramBot } from 'grammy'
import { Bots } from './Bots'
import logger from '../logger'
import env from '../env'
import { Bot } from '../entity/bot'

const { DB_URL } = env

class BotMate extends Bots {
	constructor() {
		super()
	}

	async init() {
		createConnection({
			type: 'postgres',
			url: DB_URL,
			database: 'botmate',
			entities: [Bot],
			synchronize: true,
			logging: false,
		})
			.then(() => {
				this.setup()
			})
			.catch((error) => console.log(error))
	}

	async setup() {
		const userBots = await this.fetchBots()
		userBots.map(async (botData) => {
			try {
				const bot = new TelegramBot(botData.token)
				await bot.init()
				logger.info(`starting ${bot.botInfo.id}`)
				this.start(bot) // todo: remove auto-start
			} catch (err: any) {
				logger.error(err)
			}
		})
	}
	findLoadedModules() {
		console.log('this.loadedModules', this.loadedModules)
		return this.loadedModules
	}
}

export default new BotMate()
