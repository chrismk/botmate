import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/layout'
import { botsAtom } from 'atom'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { HiChatAlt2, HiOutlineServer } from 'react-icons/hi'
import { useRecoilState } from 'recoil'

interface StatItemProps {
	title: string
	subTitle: string
	color: string
	icon: IconType
}

const Stats = () => {
	const { t } = useTranslation()
	const [bots] = useRecoilState(botsAtom)

	const StatItem: React.FC<StatItemProps> = ({
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

	return (
		<SimpleGrid spacing={4} columns={{ base: 1, md: 2 }}>
			<StatItem
				title={t('stats.totalBots')}
				subTitle={String(bots.length < 10 ? `0${bots.length}` : bots.length)}
				icon={HiChatAlt2}
				color='red'
			/>
			<StatItem
				title={t('stats.ramUsage')}
				subTitle='134 MB'
				icon={HiOutlineServer}
				color='purple'
			/>
		</SimpleGrid>
	)
}
export default Stats
