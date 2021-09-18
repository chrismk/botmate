import { Box, GridItem, SimpleGrid } from '@chakra-ui/layout'

import Stats from 'components/home/stats'
import AddNewBot from 'components/home/add-new-bot'

const Home: React.FC = () => {
	return (
		<Box>
			<SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={4}>
				<GridItem colSpan={{ base: 2 }}>
					<Stats />
				</GridItem>
				<GridItem colSpan={{ base: 2, '2xl': 1 }}>
					<AddNewBot />
				</GridItem>
			</SimpleGrid>
		</Box>
	)
}

export default Home
