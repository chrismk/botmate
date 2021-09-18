import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import { IconType } from 'react-icons'

interface UICardProps {
	title: string
}
interface UICardSettingsProps {
	title: string
	subTitle: string
	icon: IconType
	color: string
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

const UICardSettings: React.FC<UICardSettingsProps> = (props) => {
	const { children, title, icon: Icon, color, subTitle } = props

	return (
		<Box textColor='gray.500' p={4} borderWidth='1px' rounded='lg' bg='white'>
			<Flex alignItems='center'>
				<Box
					p={3}
					fontSize='4xl'
					bg={`${color}.100`}
					textColor={`${color}.400`}
					rounded='xl'
					mr={2}
				>
					<Icon />
				</Box>
				<Box>
					<Heading size='lg'>{title}</Heading>
					<Text>{subTitle}</Text>
				</Box>
			</Flex>
			<Stack spacing={4} mt={6}>
				{children}
			</Stack>
		</Box>
	)
}

export { UICard, UICardSettings }
