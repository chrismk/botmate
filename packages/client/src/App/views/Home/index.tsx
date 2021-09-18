import { Box, GridItem, SimpleGrid } from '@chakra-ui/layout'
import Stats from 'components/home/stats'

const Home: React.FC = () => {
	return (
		<Box>
			<SimpleGrid columns={4}>
				<GridItem colSpan={2}>
					<Stats />
				</GridItem>
				<GridItem colSpan={1}>2</GridItem>
				<GridItem colSpan={1}>3</GridItem>
			</SimpleGrid>
		</Box>
	)
}

export default Home
