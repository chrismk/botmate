import 'reflect-metadata'
import { createConnection } from 'typeorm'

import env from './env'
import { BotMate } from './core/BotMate'
import logger from './logger'
import server from './server'
import realsync from './realsync'
import { newBot } from './services/bot'
import { Bot } from './entity/bot'

const { NODE_ENV, PORT, DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS } = env

createConnection({
	type: 'mongodb',
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USER,
	password: DB_PASS,
	database: 'botmate',
	entities: [Bot],
	synchronize: true,
	logging: false,
})
	.then((connection) => {})
	.catch((error) => console.log(error))

// services
realsync.register('bot/new', newBot)

if (NODE_ENV === 'development') {
	new BotMate()
	server.listen(PORT, () => {
		logger.info(`listening on port ${PORT}`)
	})
}

export default { BotMate, server }
