import { Box, GridItem, SimpleGrid, Button } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'

import { Actions, Extras, Conditions } from 'components/bots/create-command'

const NewCommand: React.FC = () => {
	return (
		<Box>
			<Heading size='md' mb={4}>
				Create new command
			</Heading>
			<SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
				<GridItem>
					<Conditions />
				</GridItem>
				<GridItem>
					<Actions />
				</GridItem>
				<GridItem>
					<Extras />
				</GridItem>
			</SimpleGrid>

			<Button mt={4}>Save</Button>
		</Box>
	)
}
export default NewCommand
