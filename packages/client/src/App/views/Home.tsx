import { Box, GridItem, SimpleGrid } from '@chakra-ui/layout'
import { HiChatAlt2, HiOutlineServer } from 'react-icons/hi'
import { useRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'

import UIStat from 'components/ui/stat'
import AddNewBot from 'components/home/add-new-bot'
import { botsAtom, commonAtom } from 'atom'

const Home: React.FC = () => {
	const { t } = useTranslation()
	const [bots] = useRecoilState(botsAtom)
	const [common] = useRecoilState(commonAtom)

	return (
		<Box>
			<SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={4}>
				<GridItem colSpan={{ base: 2 }}>
					<SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
						<UIStat
							title={t('stats.totalBots')}
							subTitle={String(
								bots.length < 10 ? `0${bots.length}` : bots.length
							)}
							icon={HiChatAlt2}
							color='red'
						/>
						<UIStat
							title={t('stats.ramUsage')}
							subTitle={common.ramUsage}
							icon={HiOutlineServer}
							color='purple'
						/>
					</SimpleGrid>
				</GridItem>
				<GridItem colSpan={{ base: 2, '2xl': 1 }}>
					<AddNewBot />
				</GridItem>
			</SimpleGrid>
		</Box>
	)
}

export default Home
