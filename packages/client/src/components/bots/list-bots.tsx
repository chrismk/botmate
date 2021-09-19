import { Stack, Text } from '@chakra-ui/layout'
import { botsAtom } from 'atom'
import { useRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { UICard } from 'components/ui/card'
import { Tag } from '@chakra-ui/tag'
import { Button, ButtonGroup } from '@chakra-ui/button'

const DisplayBots: React.FC = () => {
	const { t } = useTranslation()
	const [bots] = useRecoilState(botsAtom)

	return (
		<>
			{bots.map((bot, idx) => (
				<UICard title={bot.name}>
					<Stack spacing={4} rounded='lg' transition='all 0.3s' pos='relative'>
						<Text>{bot.id}</Text>

						<ButtonGroup>
							<Link
								key={idx}
								to={{
									pathname: `/bots/${bot.id}`,
									state: bot,
								}}
							>
								<Button size='sm'>{t('common.manage')}</Button>
							</Link>
							<Button size='sm' colorScheme='red'>
								{t('common.delete')}
							</Button>
						</ButtonGroup>
					</Stack>
					<Tag pos='absolute' colorScheme='brand' right={3} top={0}>
						{t(`status.${bot.status}`)}
					</Tag>
				</UICard>
			))}
		</>
	)
}

export default DisplayBots
