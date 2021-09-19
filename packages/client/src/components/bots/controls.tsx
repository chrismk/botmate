import { Box, Button } from '@chakra-ui/react'
import { UICardSettings } from 'components/ui/card'
import realsync from 'providers/realsync'
import { useTranslation } from 'react-i18next'
import { HiCog } from 'react-icons/hi'
import { useLocation } from 'react-router'
import { Bot } from 'atom'

const BotControl: React.FC = () => {
	const { t } = useTranslation()
	const { state: bot } = useLocation<Bot>()

	const Start = async () => {
		await realsync.service('bot/start', [bot.id])
	}

	return (
		<Box>
			<UICardSettings
				title={t('common.status')}
				subTitle={t('info.botControls')}
				icon={HiCog}
				color='orange'
				extras={<Button onClick={Start}>Start</Button>}
			></UICardSettings>
		</Box>
	)
}

export default BotControl
