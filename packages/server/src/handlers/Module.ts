import { Bot, Context } from 'grammy'

type Scope = 'all' | 'private' | 'group'
type BMModuleHandler = (bot: Bot, config: any) => void

interface BMModuleParams {
	scope?: Scope[]
	role?: string
}

export interface BMModule {
	handler: BMModuleHandler
	params?: BMModuleParams
}

class ModuleHandler {
	id: string
	ui: string
	handler: BMModuleHandler
	params?: BMModuleParams

	constructor(
		id: string,
		ui: string,
		handler: BMModuleHandler,
		params?: BMModuleParams
	) {
		this.id = id
		this.ui = ui
		this.handler = handler
		this.params = params
	}
}

export { ModuleHandler }
