import { Bot as TelegramBot } from 'grammy'
import { Bot } from '../entity/bot'

const bots: TelegramBot[] = []

class Bots {
	async fetchBots() {
		const dbBots = await Bot.find()
		dbBots.forEach((bot) => bots.push(new TelegramBot(bot.token)))
		return bots
	}
}
export { Bots }
