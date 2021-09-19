import { BMModule, BMModuleMeta } from '../../types'

const module: BMModule = {
	handler: (composer) => {
		composer.command('start', (ctx) => {
			ctx.reply('working')
		})
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
