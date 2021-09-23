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
			try {
				const bot = new TelegramBot<BMContext>(botData.token)
				this.createBotInstance(bot, botData.status || 0)
			} catch (err: any) {
				logger.error(err)
			}
		})
	}

	async createBotInstance(bot: TelegramBot<BMContext>, status: number) {
		bot.use(
			session({
				initial(): SessionData {
					return { config: {} }
				},
			})
		)

		await bot.init()

		this.loadedBots[bot.botInfo.id] = {
			status: false,
			bot: bot,
			start: () => this.start(bot),
		}

		if (status === 1) {
			this.start(bot)
			logger.info(`starting ${bot.botInfo.id}`)
		}
	}

	async findBotModule(botId: number) {
		const botModule = await Module.find({ where: { botId } })
		return botModule
	}

	async restart(botId: number) {
		await this.clientStop(botId)
		this.clientStart(botId)
	}

	async clientStart(botId: number) {
		const botData = await Bot.findOne({ where: { id: botId } })
		if (botData) {
			const bot = new TelegramBot<BMContext>(botData.token)
			await Bot.update({ id: botId }, { status: 1 })
			this.createBotInstance(bot, 1)
		}

		return
	}
	async clientStop(botId: number) {
		if (this.loadedBots[botId]) {
			await this.loadedBots[botId].bot.stop()
			await Bot.update({ id: botId }, { status: 0 })
			delete this.loadedBots[botId]
		}
		return
	}
}

export default new BotMate()
