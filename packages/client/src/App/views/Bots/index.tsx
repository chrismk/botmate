import { Box } from '@chakra-ui/layout'
import { SimpleGrid } from '@chakra-ui/react'

import ListBots from 'components/bots/list-bots'

const Bots: React.FC = () => {
	return (
		<Box>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }} spacing={4}>
				<ListBots />
			</SimpleGrid>
		</Box>
	)
}

export default Bots
