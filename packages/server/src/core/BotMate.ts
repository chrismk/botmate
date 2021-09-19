import { createConnection } from 'typeorm'
import { Bot as TelegramBot } from 'grammy'
import env from '../env'
import { Handler } from './Handler'
import logger from '../logger'

import { Bot } from '../entity/bot'
import { Module } from '../entity/module'

import modules from '../modules'

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
				logger.info(`starting ${bot.botInfo.id}`)
				this.start(bot) // todo: remove auto-start
			} catch (err: any) {
				logger.error(err)
			}
		})
	}

	findLoadedModules() {
		return modules
	}
}

export default new BotMate()
