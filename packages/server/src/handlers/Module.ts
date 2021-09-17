import { Bot, Context } from 'grammy'

type Scope = 'all' | 'private' | 'group'
type BMModuleHandler = (bot: Bot, context: Context, config: any) => void

interface BMModuleParams {
	command?: string | string[]
	pattern?: RegExp
	scope?: Scope[]
	role?: string
}

export interface BMModule {
	handler: BMModuleHandler
	params: BMModuleParams
}

class ModuleHandler {
	handler: BMModuleHandler
	params: BMModuleParams

	constructor(handler: BMModuleHandler, params: BMModuleParams) {
		this.handler = handler
		this.params = params
	}
}

export { ModuleHandler }
