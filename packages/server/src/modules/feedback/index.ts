import { BMContext, BMModule, BMModuleMeta } from '../../types'

const module: BMModule = {
	handler: (composer, bot) => {
		composer.on('message', async (ctx: BMContext) => {
			const { config } = ctx.session

			const isAdmin = ctx.from?.id === Number(config.adminId)

			if (ctx.from && ctx.message && ctx.chat)
				if (!isAdmin) {
					bot.api.forwardMessage(
						config.adminId,
						ctx.chat.id,
						ctx.message.message_id
					)

					let message = `${ctx.from.id} (${ctx.message.message_id})\n**Message from** [${ctx.from?.first_name}](tg://user?id=${ctx.from.id})\n\nReply to this message`

					await bot.api.sendMessage(config.adminId, message, {
						parse_mode: 'Markdown',
					})

					ctx.reply(config.defaultReply || 'Your message have been sent')
				} else {
					if (ctx.message.text && ctx.message.reply_to_message) {
						const [meta] = ctx.message.reply_to_message.text?.split('\n') || []

						const match = meta.match(/(\d+) \((\d+)\)/)
						if (match) {
							const [, userId, msgId] = match
							bot.api.sendMessage(Number(userId), ctx.message.text, {
								reply_to_message_id: Number(msgId),
							})
						}
					} else {
						ctx.reply('😄')
					}
				}
		})
	},
	params: {
		scope: ['private'],
	},
}

const meta: BMModuleMeta = {
	id: 'feedback',
	fields: {
		adminId: {
			type: 'number',
			useCard: false,
		},
		defaultReply: {
			type: 'text',
			useCard: false,
		},
	},
}

const feedback = {
	module,
	meta,
}

export default feedback
