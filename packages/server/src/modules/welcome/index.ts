import { BMContext, BMModule, BMModuleMeta } from '../../types'

const module: BMModule = {
	handler: (composer) => {
		composer.on(':new_chat_members', (ctx: BMContext) => {
			const { message = 'Welcome' } = ctx.session.config
			ctx.reply(message)
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
	},
}

const welcome = {
	module,
	meta,
}

export default welcome
