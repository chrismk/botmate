import BotMate from '../core/BotMate'
import { Command } from '../entity/command'

const createCommand = async (client: any, params: any) => {
	const { command, name, bot } = params

	try {
		const cmd = new Command()
		cmd.actions = command.actions
		cmd.condition = command.condition
		cmd.name = name
		cmd.bot = bot

		await cmd.save()

		await BotMate.restart(bot)
	} catch (error) {
		console.log('error', error)
	}
}

const listCommand = async (client: any, params: any) => {
	const { bot } = params
	return await Command.find({ where: { bot } })
}

const deleteCommand = async (client: any, params: any) => {
	const { commandId, bot } = params
	await Command.delete({ id: commandId, bot })
}

export { createCommand, listCommand, deleteCommand }
