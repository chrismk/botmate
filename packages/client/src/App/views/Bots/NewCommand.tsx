import { useRef, useState } from 'react'
import { Input, Box, GridItem, SimpleGrid, Button } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { useParams, useHistory } from 'react-router-dom'
import { Actions, Extras, Conditions } from 'components/bots/create-command'
import realsync from 'providers/realsync'

const NewCommand: React.FC = () => {
	const history = useHistory()
	const { botId } = useParams<any>()
	const name = useRef<HTMLInputElement>(null)
	const [loading, setLoading] = useState(false)
	const [command, setCommand] = useState<any>({ actions: [], conditions: [] })

	return (
		<Box>
			<Heading size='md' mb={4}>
				Create new command
			</Heading>
			<Input ref={name} my={4} w='md' placeholder='Enter command name' />
			<SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
				<GridItem>
					<Conditions
						onSave={(conditions) => {
							setCommand({ ...command, conditions })
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

			<Button
				mt={4}
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
		</Box>
	)
}
export default NewCommand
