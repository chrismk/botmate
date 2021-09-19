import { Composer } from 'grammy'
import { ModuleHandler } from '../../handlers/Module'
import ui from './ui'

const start = new Composer()

start.command('start', (ctx) => {
	ctx.reply('start message')
})

const helloWorld = new ModuleHandler('hello-world', ui, (bot, config) => {
	bot.command('start', (ctx) => {
		ctx.reply('working')
	})
})

export default helloWorld
