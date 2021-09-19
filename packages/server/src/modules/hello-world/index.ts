import { BMModule, BMModuleMeta } from '../../types'

const module: BMModule = {
	handler: (composer) => {
		composer.command('start', (ctx) => {
			ctx.reply('working')
		})
	},
}

const meta: BMModuleMeta = {
	id: 'hello-world',
	fields: {
		message: {
			type: 'string',
			useCard: false,
		},
	},
}

const helloWorld = {
	module,
	meta,
}

export default helloWorld
