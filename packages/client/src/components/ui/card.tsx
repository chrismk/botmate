import { Box, Heading } from '@chakra-ui/layout'

interface UICardProps {
	title: string
}

const UICard: React.FC<UICardProps> = (props) => {
	const { children, title } = props

	return (
		<Box textColor='gray.500' p={4} borderWidth='1px' rounded='lg' bg='white'>
			<Heading size='md'>{title}</Heading>
			<Box mt={6}>{children}</Box>
		</Box>
	)
}

export { UICard }
