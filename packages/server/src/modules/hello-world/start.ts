import { ModuleHandler } from '../../handlers/Module'

const start = new ModuleHandler(
	(bot, context) => {
		context.reply('Hello World')
	},
	{
		command: ['start'],
	}
)

export default start
