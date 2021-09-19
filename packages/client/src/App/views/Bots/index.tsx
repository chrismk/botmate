import { Box, GridItem } from '@chakra-ui/layout'
import { SimpleGrid } from '@chakra-ui/react'

import ListBots from 'components/bots/list-bots'

const Bots: React.FC = () => {
	return (
		<Box>
			<SimpleGrid columns={4} spacing={4}>
				<ListBots />
			</SimpleGrid>
		</Box>
	)
}

export default Bots
