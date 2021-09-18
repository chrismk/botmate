import { getConnection } from 'typeorm'
import { Client } from '@realsync/server'
import { Bot as TelegramBot } from 'grammy'
import { Bot } from '../entity/bot'

const newBot = async (client: Client, token: string) => {
	const userBot = new TelegramBot(token)
	const connection = await getConnection()
	await userBot.init().then(async () => {
		const { id, first_name } = userBot.botInfo

		let bot = new Bot()

		bot.id = id
		bot.name = first_name
		bot.token = token

		await connection.manager
			.save(bot)
			.then(() => {
				console.log('saved')
			})
			.catch((err) => {
				console.log(err)
			})
	})

	return userBot.botInfo
}

export { newBot }
