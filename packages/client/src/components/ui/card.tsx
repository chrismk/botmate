import { Box, Heading, Stack } from '@chakra-ui/layout'

interface UICardProps {
	title: string
}

const UICard: React.FC<UICardProps> = (props) => {
	const { children, title } = props

	return (
		<Box textColor='gray.500' p={4} borderWidth='1px' rounded='lg' bg='white'>
			<Heading size='md'>{title}</Heading>
			<Stack spacing={4} mt={6}>
				{children}
			</Stack>
		</Box>
	)
}

export { UICard }
