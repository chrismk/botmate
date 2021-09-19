import { Box, Button } from '@chakra-ui/react'
import { UICardSettings } from 'components/ui/card'
import realsync from 'providers/realsync'
import { useTranslation } from 'react-i18next'
import { HiCog } from 'react-icons/hi'
import { useLocation } from 'react-router'
import { Bot } from 'atom'
import { useState } from 'react'

const BotControl: React.FC = () => {
	const { t } = useTranslation()
	const { state: bot } = useLocation<Bot>()
	const [status, setStatus] = useState(bot.status)

	const Start = async () => {
		await realsync.service('bot/start', [bot.id])
		setStatus(1)
	}

	const Stop = async () => {
		await realsync.service('bot/stop', [bot.id])
		setStatus(0)
	}

	return (
		<Box>
			<UICardSettings
				title={t('common.status')}
				subTitle={t('info.botControls')}
				icon={HiCog}
				color='orange'
				extras={
					<Button
						onClick={status ? Stop : Start}
						colorScheme={status ? 'red' : 'brand'}
					>
						{t(`common.${status ? 'stop' : 'start'}`)}
					</Button>
				}
			></UICardSettings>
		</Box>
	)
}

export default BotControl
