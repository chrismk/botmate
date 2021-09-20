import { Client } from '@realsync/server'
import BotMate from '../core/BotMate'
import { Bot } from '../entity/bot'
import { Module } from '../entity/module'

const installModule = async (client: Client, params: any) => {
	const { botId, moduleId } = params

	const exists = await Module.findOne({ botId, moduleId })

	if (!exists) {
		const module = new Module()
		module.botId = botId
		module.moduleId = moduleId
		await module.save()
	} else {
		return { error: 'pluginAlreadyInstalled' }
	}

	return true
}

const removeModule = async (client: Client, params: any) => {
	const { botId, moduleId } = params

	const exists = await Module.findOne({ botId, moduleId })

	if (exists) {
		await Module.delete({ botId, moduleId })
		await BotMate.restart(botId)
	} else {
		return { error: 'pluginNotFound' }
	}

	return true
}

const saveConfig = async (
	client: Client,
	value: string,
	configProperty: string,
	botId: number,
	moduleId: string
) => {
	const module = await Module.findOne({ where: { botId, moduleId } })
	if (module) {
		const { config } = module
		config[configProperty] = value
		await Module.update({ botId }, { config: config })
	}
}

export { installModule, saveConfig, removeModule }
