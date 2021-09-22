require('dotenv/config')
const { existsSync } = require('fs')
const path = require('path')

const distFolder = path.join(__dirname, '../dist')

if (!existsSync(distFolder)) {
	console.error(
		'[ERROR] Could not find "dist" folder. Please run yarn build from from the root package.'
	)
	process.exit(1)
}

const { PORT = 5337, DB_URL } = process.env
const { default: BotMate } = require('../dist/main')
BotMate(PORT, DB_URL)
