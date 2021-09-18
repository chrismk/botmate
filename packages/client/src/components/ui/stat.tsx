import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { IconType } from 'react-icons'

interface StatItemProps {
	title: string
	subTitle: string
	color: string
	icon: IconType
}

const UIStat: React.FC<StatItemProps> = ({
	title,
	subTitle,
	icon: Icon,
	color,
}) => (
	<Flex
		p={2}
		rounded='lg'
		bg='white'
		borderWidth='1px'
		textColor='gray.500'
		alignItems='center'
	>
		<Box
			fontSize='6xl'
			p={2}
			mr={3}
			bg={`${color}.100`}
			rounded='lg'
			textColor={`${color}.400`}
		>
			<Icon />
		</Box>
		<Box>
			<Heading fontSize='3xl'>{title}</Heading>
			<Text fontSize='3xl'>{subTitle}</Text>
		</Box>
	</Flex>
)

export default UIStat
