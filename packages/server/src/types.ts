import { Bot, Composer } from 'grammy'

export type BMModuleHandler = (
	composer: Composer<any>,
	bot?: Bot,
	config?: any
) => void

type Scope = 'all' | 'private' | 'group'

export interface BMModuleParams {
	scope?: Scope[]
	role?: string
}

export interface BMModule {
	handler: BMModuleHandler
	params?: BMModuleParams
}

export interface BMModuleMeta {
	id: string
	examples?: string[]
	fields?: any
}

export interface BMModuleData {
	[id: string]: {
		module: BMModule
		meta: BMModuleMeta
	}
}

export interface LoadedBots {
	[botId: number]: {
		status: boolean
		bot: Bot
		start: () => void
	}
}
