import { Bot, Composer, Context, SessionFlavor } from 'grammy'

export interface SessionData {
	config: any
}

export type BMContext = Context & SessionFlavor<SessionData>

export type BMModuleHandler = (
	composer: Composer<any>,
	bot: Bot<BMContext>
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
		bot: Bot<BMContext>
		start: () => void
	}
}

export type CommandAction = {
	type: 'text'
	text: string
}
export type CommandCondition = {
	type: 'fullMatch' | 'regExp'
	text: string
}
export interface BMCommand {
	id: number
	name: string
	actions: {
		data: CommandAction[]
	}
	condition: {
		data: CommandCondition
	}
}
