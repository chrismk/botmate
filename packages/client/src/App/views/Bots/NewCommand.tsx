import { useRef, useState } from 'react'
import {
	Input,
	Stack,
	GridItem,
	SimpleGrid,
	ButtonGroup,
	Button,
} from '@chakra-ui/react'
import { useParams, useHistory } from 'react-router-dom'
import { Actions, Extras, Condition } from 'components/bots/create-command'
import realsync from 'providers/realsync'
import { UICard } from 'components/ui/card'

const NewCommand: React.FC = () => {
	const history = useHistory()
	const { botId } = useParams<any>()
	const name = useRef<HTMLInputElement>(null)
	const [loading, setLoading] = useState(false)
	const [command, setCommand] = useState<any>({ actions: [], conditions: [] })

	return (
		<Stack spacing={4}>
			<UICard title='Create new command'>
				<Input
					ref={name}
					w={{ base: 'full', md: 'md' }}
					placeholder='Enter command name'
				/>
			</UICard>
			<SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
				<GridItem>
					<Condition
						onSave={(condition) => {
							setCommand({ ...command, condition })
						}}
					/>
				</GridItem>
				<GridItem>
					<Actions
						onSave={(actions) => {
							setCommand({ ...command, actions })
						}}
					/>
				</GridItem>
				<GridItem>
					<Extras />
				</GridItem>
			</SimpleGrid>

			<ButtonGroup size='sm' mt={4}>
				<Button
					isLoading={loading}
					onClick={async () => {
						setLoading(true)
						await realsync.service('command/create', {
							command,
							name: name.current?.value,
							bot: botId,
						})
						setLoading(false)
						history.goBack()
					}}
				>
					Save
				</Button>
				<Button
					colorScheme='red'
					onClick={() => {
						history.goBack()
					}}
				>
					Cancel
				</Button>
			</ButtonGroup>
		</Stack>
	)
}
export default NewCommand
