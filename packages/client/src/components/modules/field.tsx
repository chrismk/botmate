import { Button, ButtonGroup, Input, Textarea, Switch } from '@chakra-ui/react'
import { UICard } from 'components/ui/card'
import realsync from 'providers/realsync'
import { useState } from 'react'
import ButtonBuilder from '../app/button-builder'

export type FieldType = 'text' | 'string' | 'number' | 'switch' | 'button'

interface Props {
	id: string
	module: string
	type: FieldType
	name: string
	info: string
	botId: number
	placeholder: string
	defValue?: string
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
	const { id, botId, type, placeholder, name, info, defValue, module } = props
	const [loading, setLoading] = useState(false)
	const [value, setValue] = useState<any>(null)
	let Component = null,
		Extras = null

	const SaveValue = async () => {
		setLoading(true)
		await realsync.service(`module/save-config`, [value, id, botId, module])
		setLoading(false)
	}

	switch (type) {
		case 'text':
			Component = (
				<Textarea
					defaultValue={defValue}
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
					defaultValue={defValue}
					placeholder={placeholder}
					onChange={(e) => setValue(e.target.value)}
				/>
			)
			break
		case 'number':
			Component = (
				<Input
					defaultValue={defValue}
					type='number'
					placeholder={placeholder}
					onChange={(e) => setValue(e.target.value)}
				/>
			)
			break
		case 'switch':
			Extras = <Switch />
			break
		case 'button':
			Component = (
				<ButtonBuilder
					defValue={defValue}
					onChange={(button) => {
						setValue(button)
					}}
				/>
			)
			break
		default:
			Component = null
	}

	return (
		<UICard title={name} subTitle={info} extras={Extras}>
			{Component}
			{!Extras && (
				<ButtonGroup size='sm'>
					<Button isLoading={loading} onClick={SaveValue}>
						Save
					</Button>
				</ButtonGroup>
			)}
		</UICard>
	)
}

export default ModuleField
