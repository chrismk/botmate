import { Client } from '@realsync/server'
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

const saveConfig = async (
	client: Client,
	value: string,
	configProperty: string,
	botId: number
) => {
	const module = await Module.findOne({ where: { botId } })
	if (module) {
		const { config } = module
		config[configProperty] = value
		await Module.update({ botId }, { config: config })
	}
}

export { installModule, saveConfig }
