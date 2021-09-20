import { InlineKeyboard } from 'grammy'
import { BMContext, BMModule, BMModuleMeta } from '../../types'

const module: BMModule = {
	handler: (composer) => {
		composer.on(':new_chat_members', (ctx: BMContext) => {
			const { buttons } = ctx.session.config
			const { message = 'Welcome' } = ctx.session.config
			ctx.reply(message, {
				reply_markup: {
					inline_keyboard: buttons,
				},
			})
		})
	},
	params: {
		scope: ['group'],
	},
}

const meta: BMModuleMeta = {
	id: 'welcome',
	fields: {
		message: {
			type: 'text',
		},
		buttons: {
			type: 'button',
		},
		hv: {
			type: 'switch',
		},
	},
}

const welcome = {
	module,
	meta,
}

export default welcome
