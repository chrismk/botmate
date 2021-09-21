import {
	Box,
	BoxProps,
	Flex,
	Heading,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/layout'
import { IconType } from 'react-icons'

interface UICardProps {
	title: string
	subTitle?: string
	style?: BoxProps
	extras?: any
}
interface UICardSettingsProps extends UICardProps {
	icon: IconType
	color: string
}

const UICard: React.FC<UICardProps> = (props) => {
	const { children, title, subTitle, style = {}, extras } = props

	return (
		<Box
			textColor='gray.500'
			p={4}
			borderWidth='1px'
			rounded='lg'
			bg='white'
			pos='relative'
			{...style}
		>
			<Flex alignItems='center'>
				<Box>
					<Heading size='md'>{title}</Heading>
					{subTitle && (
						<Text mt={2} size='md'>
							{subTitle}
						</Text>
					)}
				</Box>
				<Spacer />
				{extras}
			</Flex>
			{children && (
				<Stack spacing={4} mt={6}>
					{children}
				</Stack>
			)}
		</Box>
	)
}

const UICardSettings: React.FC<UICardSettingsProps> = (props) => {
	const {
		children,
		title,
		icon: Icon,
		color,
		subTitle,
		extras,
		style = {},
	} = props

	return (
		<Box
			textColor='gray.500'
			p={4}
			borderWidth='1px'
			rounded='lg'
			bg='white'
			{...style}
		>
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
				<Spacer />
				{extras}
			</Flex>
			{children && (
				<Stack spacing={4} mt={6}>
					{children}
				</Stack>
			)}
		</Box>
	)
}

export { UICard, UICardSettings }
