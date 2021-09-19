import { Client } from '@realsync/server'
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

export { installModule }
