import { BMContext, BMModule, BMModuleMeta } from '../../types'

const module: BMModule = {
	handler: (composer) => {
		composer.command('start', (ctx: BMContext) => {
			console.log(ctx.session.config)
			ctx.reply('working')
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
