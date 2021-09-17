import { BMModule } from '../../handlers/Module'
import { BMMeta } from '..'
import start from './start'

export const meta: BMMeta = {
	id: 'hello-world',
}

const handlers: BMModule[] = [start]

export default { meta, handlers }
