import { atom } from 'recoil'

export interface Bot {
	id: number
	token: string
	name: string
	status: number
}

export const botsAtom = atom({
	key: 'bots',
	default: [] as Bot[],
})

export interface Common {
	ramUsage: string
	version: string
}

export const commonAtom = atom({
	key: 'common',
	default: {} as Common,
})

export interface Module {
	[id: string]: {
		meta: {
			id: string
		}
	}
}

export const modulesAtom = atom({
	key: 'modules',
	default: {} as Module,
})

export interface InstalledModule {
	active: boolean
	id: number
	config: any
	moduleId: string
	botId: number
}

export const installedModulesAtom = atom({
	key: 'installedModules',
	default: {} as InstalledModule,
})

interface ActiveBot {
	[botId: number]: { status: boolean }[]
}

export const activeBotsAtom = atom({
	key: 'installedModules',
	default: {} as ActiveBot,
})
