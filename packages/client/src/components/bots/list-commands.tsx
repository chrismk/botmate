import { Button } from '@chakra-ui/button'
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout'
import { UICard } from 'components/ui/card'
import realsync from 'providers/realsync'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ActionsData, ConditionsData } from './create-command'

interface CommandsState {
	id: number
	name: string
	active: boolean
	bot: number
	conditions: ConditionsData[]
	actions: ActionsData[]
}

const ListCommands: React.FC = () => {
	const [commands, setCommands] = useState<CommandsState[]>()
	const history = useHistory()
	const params = useParams<any>()

	const Fetch = async () => {
		const cmds: any = await realsync.service('command/list', {
			bot: params.botId,
		})
		setCommands(cmds)
	}

	useEffect(() => {
		Fetch()
	}, [])

	return (
		<UICard
			title='Commands'
			extras={
				<Button
					size='sm'
					onClick={() =>
						history.push(history.location.pathname + '/new-command')
					}
				>
					New
				</Button>
			}
		>
			{commands?.map((command, idx) => {
				return (
					<Flex key={idx}>
						<Text>{command.name || 'No name ' + idx}</Text>
						<Spacer />
						<Button
							size='xs'
							colorScheme='red'
							onClick={async () => {
								await realsync.service('command/delete', {
									bot: params.botId,
									commandId: command.id,
								})
								Fetch()
							}}
						>
							Delete
						</Button>
					</Flex>
				)
			})}
		</UICard>
	)
}

export default ListCommands
