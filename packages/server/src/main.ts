import env from './env'
import 'reflect-metadata'

import BotMate from './core/BotMate'
import logger from './logger'
import server from './server'
import realsync from './realsync'
import modules from './modules'

// services import
import { common } from './services/common'
import { allBot, newBot } from './services/bot'
import { installModule, removeModule, saveConfig } from './services/module'
import {
	createCommand,
	deleteCommand,
	listCommand,
	updateCommand,
} from './services/command'

const { NODE_ENV, PORT } = env

// services
realsync.register('bot/new', newBot)
realsync.register('bot/all', allBot)
realsync.register('bot/active', () => BotMate.loadedBots)
realsync.register('bot/start', (client, id: number) => BotMate.clientStart(id))
realsync.register('bot/stop', (client, id: number) => BotMate.clientStop(id))

realsync.register('module/active', (client, botId: number) =>
	BotMate.findBotModule(botId)
)
realsync.register('module/install', installModule)
realsync.register('module/remove', removeModule)
realsync.register('module/all', () => modules)
realsync.register('module/save-config', saveConfig)

realsync.register('command/create', createCommand)
realsync.register('command/list', listCommand)
realsync.register('command/delete', deleteCommand)
realsync.register('command/update', updateCommand)

realsync.register('common', common)

if (NODE_ENV !== 'production') {
	BotMate.init()
	server.listen(PORT, () => {
		logger.info(`listening on port ${PORT}`)
	})
}

export default (port: number, dbUrl?: string) => {
	BotMate.init(dbUrl)
	server.listen(port, () => {
		logger.info(`listening on port ${port}`)
	})
}
