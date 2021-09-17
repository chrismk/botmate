import { Bot } from 'grammy'

const bots: Bot[] = []

class Bots {
	async fetchBots() {
		// todo: fetch from database
		return bots
	}
}
export { Bots }
