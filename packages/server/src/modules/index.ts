import { ModuleHandler } from '../handlers/Module'

import helloWorld from './hello-world'

export interface BMMeta {
	id: string
	examples?: string[]
	fields?: any
}

const modules: ModuleHandler[] = [helloWorld]
export default modules
