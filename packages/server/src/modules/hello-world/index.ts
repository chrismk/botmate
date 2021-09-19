import { ModuleMeta } from '..'
import { BMModule } from '../../types'

const module: BMModule = {
	handler: (composer) => {
		composer.command('start', (ctx) => {
			ctx.reply('working')
		})
	},
}

const meta: ModuleMeta = {
	id: 'hello-world',
}

const helloWorld = {
	module,
	meta,
}

export default helloWorld
