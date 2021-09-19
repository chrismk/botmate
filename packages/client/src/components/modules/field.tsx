import { Button, ButtonGroup, Input, Textarea } from '@chakra-ui/react'
import { UICard } from 'components/ui/card'
import realsync from 'providers/realsync'
import { useState } from 'react'

export type FieldType = 'text' | 'string' | 'number'

interface Props {
	id: string
	type: FieldType
	name: string
	info: string
	botId: number
	placeholder: string
}

// const getColSpan = (type: FieldType) => {
// 	switch (type) {
// 		case 'number':
// 			return 2
// 		case 'string':
// 			return 3
// 		case 'text':
// 			return 4
// 	}
// }

const ModuleField: React.FC<Props> = (props) => {
	const { id, botId, type, placeholder, name, info } = props
	const [loading, setLoading] = useState(false)
	const [value, setValue] = useState<any>(null)
	let Component = null

	const SaveValue = async () => {
		setLoading(true)
		await realsync.service(`module/save-config`, [value, id, botId])
		setLoading(false)
	}

	switch (type) {
		case 'text':
			Component = (
				<Textarea
					rows={6}
					resize='none'
					placeholder={placeholder}
					onChange={(e) => setValue(e.target.value)}
				/>
			)
			break
		case 'string':
			Component = (
				<Input
					placeholder={placeholder}
					onChange={(e) => setValue(e.target.value)}
				/>
			)
			break
		case 'number':
			Component = (
				<Input
					type='number'
					placeholder={placeholder}
					onChange={(e) => setValue(e.target.value)}
				/>
			)
			break
		default:
			Component = null
	}

	return (
		<UICard title={name} subTitle={info}>
			{Component}
			<ButtonGroup size='sm'>
				<Button isLoading={loading} onClick={SaveValue}>
					Save
				</Button>
			</ButtonGroup>
		</UICard>
	)
}

export default ModuleField
