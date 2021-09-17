import winston from 'winston'
const { NODE_ENV } = process.env

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.simple(),
	transports: [
		new winston.transports.File({ filename: 'bm-error.log', level: 'error' }),
	],
})

if (NODE_ENV === 'development') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
		})
	)
}

export default logger
