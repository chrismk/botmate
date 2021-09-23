import { useEffect, useState } from 'react'
import {
	Flex,
	Divider,
	Spacer,
	Text,
	Tag,
	Box,
	Button,
	ButtonGroup,
	IconButton,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import { HiOutlineTrash, HiPencil } from 'react-icons/hi'
import realsync from 'providers/realsync'

import { ActionsData, ConditionData } from './command'
import { UICard } from 'components/ui/card'

interface CommandsState {
	id: number
	name: string
	active: boolean
	bot: number
	condition: { data: ConditionData }
	actions: { data: ActionsData[] }
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
					<Box key={idx}>
						<Flex>
							<Box>
								<Text>{command.name || 'No name ' + idx}</Text>
								<Tag size='sm'>{command.actions.data.length} actions</Tag>
							</Box>
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
					</Box>
				)
			})}
		</UICard>
	)
}

export default ListCommands
