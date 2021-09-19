import { BMModuleData } from '../types'
import feedback from './feedback'
import helloWorld from './hello-world'

const modules: BMModuleData = {
	[helloWorld.meta.id]: helloWorld,
	[feedback.meta.id]: feedback,
}

export default modules
