import { createConnection } from 'typeorm'
import { Composer } from 'grammy'
import { Bots } from './Bots'
import logger from '../logger'
import env from '../env'
import { Bot } from '../entity/bot'

interface BotProperty {
	id: number
	name: string
	start: () => void
	stop: () => void
}

const { DB_URL } = env

class BotMate extends Bots {
	bots: BotProperty[] = []

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
		userBots.map(async (bot) => {
			try {
				await bot.init()
				const { botInfo } = bot
				logger.info(`starting ${botInfo.id}`)

				const prop: BotProperty = {
					id: botInfo.id,
					name: botInfo.first_name,
					start: () => {
						bot.start()
					},
					stop: () => {
						bot.stop()
					},
				}

				this.bots.push(prop)
			} catch (err: any) {
				logger.error(err)
			}
		})
	}

	async loadModule(id: number, moduleFunction: Composer<any>) {
		const bot = this.bots.find((props) => props.id === id)
		console.log('bot', bot)
	}
}

export { BotMate }
