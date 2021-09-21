import { Bot as TelegramBot } from 'grammy'
import { BMCommand, BMContext, CommandAction } from '../types'

class CommandHandler {
	bot: TelegramBot<BMContext>
	command: BMCommand

	constructor(bot: TelegramBot<BMContext>, command: BMCommand) {
		this.bot = bot
		this.command = command

		this.handle()
	}

	async handle() {
		const condition = this.command.condition.data
		const actions: CommandAction[] = this.command.actions.data

		this.bot.on('msg:text', (ctx) => {
			const text = ctx.message?.text || ''

			switch (condition.type) {
				case 'fullMatch':
					if (text == condition.text) {
						actions.map((action) => {
							this.performAction(ctx, action)
						})
					}
					break
				case 'regExp':
					if (text.match(condition.text)) {
						actions.map((action) => {
							this.performAction(ctx, action)
						})
					}
					break
				default:
					return null
			}
		})
	}

	async performAction(ctx: BMContext, action: CommandAction) {
		const { type, text } = action
		console.log('text', text)
		console.log('type', type)
		switch (type) {
			case 'text':
				ctx.reply(text)
				break
		}
	}
}
export { CommandHandler }
