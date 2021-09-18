import { Box, Stack, Text } from '@chakra-ui/layout'
import { botsAtom } from 'atom'
import { useRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { UICard } from 'components/ui/card'
import { Tag } from '@chakra-ui/tag'

const DisplayBots: React.FC = () => {
	const { t } = useTranslation()
	const [bots] = useRecoilState(botsAtom)

	return (
		<UICard title={t('common.allBots')}>
			<Stack spacing={4}>
				{bots.map((bot, idx) => (
					<Link
						key={idx}
						to={{
							pathname: `/bots/${bot.id}`,
							state: bot,
						}}
					>
						<Box
							rounded='lg'
							transition='all 0.3s'
							_hover={{
								textColor: 'brand.400',
							}}
							cursor='pointer'
							pos='relative'
						>
							<Text fontSize='xl'>{bot.name}</Text>
							<Text>{bot.id}</Text>
							<Tag pos='absolute' colorScheme='brand' right={3} top={3}>
								{t(`status.${bot.status}`)}
							</Tag>
						</Box>
					</Link>
				))}
			</Stack>
		</UICard>
	)
}

export default DisplayBots
