import { Input } from '@chakra-ui/react'
import { UICard } from 'components/ui/card'

export type FieldType = 'string' | 'number'

interface Props {
	type: FieldType
	name: string
	info: string
	placeholder: string
}

const ModuleField: React.FC<Props> = (props) => {
	const { type, placeholder, name, info } = props

	let Component = null

	switch (type) {
		case 'string':
			Component = (
				<UICard title={name} subTitle={info}>
					<Input placeholder={placeholder} />
				</UICard>
			)
			break
		default:
			Component = null
	}

	return Component
}

export default ModuleField
