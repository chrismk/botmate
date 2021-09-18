import env from './env'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

import { BotMate } from './core/BotMate'
import logger from './logger'
import server from './server'
import realsync from './realsync'

// entities
import { Bot } from './entity/bot'

// services import
import { allBot, newBot } from './services/bot'
import { common } from './services/common'

const { NODE_ENV, PORT, DB_URL } = env

createConnection({
	type: 'postgres',
	url: DB_URL,
	database: 'botmate',
	entities: [Bot],
	synchronize: true,
	logging: false,
})
	.then((connection) => {
		new BotMate()
	})
	.catch((error) => console.log(error))

// services
realsync.register('bot/new', newBot)
realsync.register('bot/all', allBot)

realsync.register('common', common)

if (NODE_ENV === 'development') {
	server.listen(PORT, () => {
		logger.info(`listening on port ${PORT}`)
	})
}

export default { BotMate, server }
