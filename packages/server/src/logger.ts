import { createLogger, format, transports } from 'winston'

const { NODE_ENV } = process.env

const logFormatter = format.printf((info) => {
	let { timestamp, level, stack, message } = info
	message = stack || message
	return `${timestamp} ${level}: ${message}`
})

const logger = createLogger({
	level: 'info',
	format: format.simple(),
	transports: [
		new transports.File({
			filename: 'logs/errors.log',
			level: 'error',
			format: format.combine(format.simple(), format.timestamp(), logFormatter),
		}),
		new transports.File({
			filename: 'logs/botmate.log',
			level: 'debug',
			format: format.combine(format.simple(), format.timestamp(), logFormatter),
		}),
	],
})

logger.add(
	new transports.Console({
		format: format.combine(
			format.colorize(),
			format.simple(),
			format.timestamp(),
			logFormatter
		),
	})
)

export default logger
