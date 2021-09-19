import env from './env'
import 'reflect-metadata'

import BotMate from './core/BotMate'
import logger from './logger'
import server from './server'
import realsync from './realsync'

// services import
import { allBot, newBot } from './services/bot'
import { common } from './services/common'
import { installModule } from './services/module'

const { NODE_ENV, PORT } = env

// services
realsync.register('bot/new', newBot)
realsync.register('bot/all', allBot)
realsync.register('bot/all-modules', () => BotMate.findLoadedModules())
realsync.register('module/install', installModule)

realsync.register('common', common)

if (NODE_ENV === 'development') {
	BotMate.init()
	server.listen(PORT, () => {
		logger.info(`listening on port ${PORT}`)
	})
}

export default { BotMate, server }
