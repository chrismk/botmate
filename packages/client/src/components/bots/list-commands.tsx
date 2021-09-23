import { Button, ButtonGroup, IconButton } from '@chakra-ui/button'
import { Flex, Spacer, Text } from '@chakra-ui/layout'
import { UICard } from 'components/ui/card'
import realsync from 'providers/realsync'
import { useEffect, useState } from 'react'
import { HiOutlineTrash, HiPencil } from 'react-icons/hi'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { ActionsData, ConditionData } from './command'

interface CommandsState {
	id: number
	name: string
	active: boolean
	bot: number
	condition: ConditionData
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
						<ButtonGroup size='sm'>
							<Link
								to={{
									pathname: history.location.pathname + '/edit-command',
									state: command,
								}}
							>
								<IconButton
									aria-label='edit'
									variant='ghost'
									icon={<HiPencil />}
								/>
							</Link>
							<IconButton
								aria-label='delete'
								variant='outline'
								icon={<HiOutlineTrash />}
								colorScheme='red'
								onClick={async () => {
									await realsync.service('command/delete', {
										bot: params.botId,
										commandId: command.id,
									})
									Fetch()
								}}
							/>
						</ButtonGroup>
					</Flex>
				)
			})}
		</UICard>
	)
}

export default ListCommands
