import { createConnection } from 'typeorm'
import { Bot as TelegramBot, session } from 'grammy'
import env from '../env'
import { Handler } from './Handler'
import logger from '../logger'

import { Bot } from '../entity/bot'
import { Module } from '../entity/module'
import { BMContext, SessionData } from '../types'

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
			if (botData.status === 1)
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

					this.loadedBots[bot.botInfo.id] = {
						status: false,
						bot: bot,
						start: () => this.start(bot),
					}

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
