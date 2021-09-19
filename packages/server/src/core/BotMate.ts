import { createConnection } from 'typeorm'
import { Bot as TelegramBot } from 'grammy'
import env from '../env'
import { Handler } from './Handler'
import logger from '../logger'

import { Bot } from '../entity/bot'
import { Module } from '../entity/module'

const { DB_URL } = env

class BotMate extends Handler {
	constructor() {
		super()
	}

	async init() {
		// db connection
		createConnection({
			type: 'postgres',
			url: DB_URL,
			database: 'botmate',
			entities: [Bot, Module],
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

				this.loadedBots[bot.botInfo.id] = {
					status: false,
					start: () => this.start(bot),
					stop: () => this.stop(bot),
				}

				logger.info(`starting ${bot.botInfo.id}`)
			} catch (err: any) {
				logger.error(err)
			}
		})
	}

	async findBotModule(botId: number) {
		const botModule = await Module.find({ where: { botId } })
		return botModule
	}

	async clientStart(botId: number) {
		await this.loadedBots[botId].start()
		return
	}
	async clientStop(botId: number) {
		await this.loadedBots[botId].stop()
		return
	}
}

export default new BotMate()
