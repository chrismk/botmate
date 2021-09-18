import { BotMate } from './core/BotMate'
import logger from './logger'
import server from './server'

const { NODE_ENV, PORT = 5337 } = process.env

if (NODE_ENV === 'development') {
	new BotMate()
	server.listen(PORT, () => {
		logger.info(`listening on port ${PORT}`)
	})
}

export default { BotMate, server }
