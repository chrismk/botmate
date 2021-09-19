import { Client } from '@realsync/server'
import { Bot as TelegramBot } from 'grammy'
import { Bot } from '../entity/bot'

const newBot = async (client: Client, token: string) => {
	const userBot = new TelegramBot(token)
	await userBot.init().then(async () => {
		const { id, first_name } = userBot.botInfo

		let bot = new Bot()

		bot.id = id
		bot.name = first_name
		bot.token = token

		await bot.save()
	})

	return userBot.botInfo
}

const allBot = async (client: Client) => {
	const bots = await Bot.find()
	return bots
}

const installedModules = async (client: Client, botId: number) => {}

export { newBot, allBot, installedModules }
