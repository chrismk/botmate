import { Box, Heading } from '@chakra-ui/layout'

interface AppHeaderProps {
	title: string
}

const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
	return (
		<Box p={4} bg='white' shadow='sm'>
			<Heading textColor='gray.600'>{title}</Heading>
		</Box>
	)
}

export default AppHeader
