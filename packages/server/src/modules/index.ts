import { BMModule } from '../types'
import helloWorld from './hello-world'

export interface ModuleMeta {
	id: string
	examples?: string[]
	fields?: any
}

export interface Module {
	module: BMModule
	meta: ModuleMeta
}

const modules: Module[] = [helloWorld]
export default modules
