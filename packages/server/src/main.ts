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

const { NODE_ENV, PORT, DB_URL } = env

createConnection({
	type: 'postgres',
	url: DB_URL,
	database: 'botmate',
	entities: [Bot],
	synchronize: true,
	logging: false,
})
	// .then((connection) => {})
	.catch((error) => console.log(error))

// services
realsync.register('bot/new', newBot)
realsync.register('bot/all', allBot)

if (NODE_ENV === 'development') {
	new BotMate()
	server.listen(PORT, () => {
		logger.info(`listening on port ${PORT}`)
	})
}

export default { BotMate, server }
