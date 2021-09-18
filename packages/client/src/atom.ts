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
