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
