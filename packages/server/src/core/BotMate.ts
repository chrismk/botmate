import path from 'path'
import { createConnection } from 'typeorm'
import { Bot as TelegramBot, session } from 'grammy'
import env from '../env'
import { Handler } from './Handler'
import logger from '../logger'

import { Bot } from '../entity/bot'
import { Module } from '../entity/module'
import { BMContext, SessionData } from '../types'

const { DB_URL, SSL } = env
class BotMate extends Handler {
	constructor() {
		super()
	}

	async init(dbUrl?: string) {
		let ssl: any = {}
		let type: 'postgres' | 'mongodb' = 'mongodb'

		if (DB_URL.startsWith('postgres')) {
			type = 'postgres'
		}

		if (SSL) {
			ssl.rejectUnauthorized = false
		} else {
			ssl = false
		}

		// db connection
		createConnection({
			useUnifiedTopology: true,
			type,
			url: dbUrl || DB_URL,
			database: 'botmate',
			entities: [path.join(__dirname, '../entity/*.{ts,js}')],
			synchronize: true,
			logging: false,
			ssl,
		})
			.then(() => {
				this.setup()
			})
			.catch((error) => console.log(error))
	}

	async setup() {
		const userBots = await this.fetchBots()
		userBots.map(async (botData) => {
			if (botData && botData.status === 1)
				try {
					const bot = new TelegramBot<BMContext>(botData.token)

					bot.use(
						session({
							initial(): SessionData {
								return { config: {} }
							},
						})
					)

					await bot.init()

					this.start(bot)
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

	async restart(botId: number) {
		await this.clientStop(botId)
		await this.clientStart(botId)
	}

	async clientStart(botId: number) {
		await Bot.update({ id: botId }, { status: 1 })
		this.loadedBots[botId].start()
		return
	}
	async clientStop(botId: number) {
		await this.loadedBots[botId].bot.stop()
		await Bot.update({ id: botId }, { status: 0 })
		return
	}
}

export default new BotMate()
