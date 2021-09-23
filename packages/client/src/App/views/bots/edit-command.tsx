import { useRef, useState } from 'react'
import {
	Input,
	Stack,
	GridItem,
	SimpleGrid,
	ButtonGroup,
	Button,
} from '@chakra-ui/react'
import { Actions, Extras, Condition } from 'components/bots/command'
import realsync from 'providers/realsync'
import { UICard } from 'components/ui/card'

import { Redirect, useHistory, useLocation } from 'react-router'
import { ActionsData, ConditionData } from 'components/bots/command'

interface Command {
	id: number
	name: string
	condition: {
		data: ConditionData
	}
	actions: {
		data: ActionsData[]
	}
	active: boolean
	bot: number
}

interface EditCommandProps {
	state?: Command
}

const EditCommand: React.FC<EditCommandProps> = () => {
	const [loading, setLoading] = useState(false)
	const [command, setCommand] = useState({})
	const { state: prevCommand } = useLocation<Command>()
	const history = useHistory()

	if (!prevCommand) {
		return <Redirect to='/home' />
	}

	return (
		<Stack spacing={4}>
			<UICard title='Create new command'>
				<Input
					disabled
					value={prevCommand.name}
					w={{ base: 'full', md: 'md' }}
					placeholder='Enter command name'
				/>
			</UICard>
			<SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
				<GridItem>
					<Condition
						def={prevCommand.condition.data}
						onSave={(condition) => {
							setCommand({ ...command, condition })
						}}
					/>
				</GridItem>
				<GridItem>
					<Actions
						def={prevCommand.actions.data}
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
						await realsync.service('command/update', {
							...command,
							id: prevCommand.id,
							bot: prevCommand.bot,
						})
						await realsync.service('bot/restart', [prevCommand.bot])
						setLoading(false)
					}}
				>
					Update
				</Button>
				<Button
					variant='outline'
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

export { EditCommand }
