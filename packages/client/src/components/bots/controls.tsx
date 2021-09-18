import { Box } from '@chakra-ui/layout'
import { Switch } from '@chakra-ui/react'
import { UICardSettings } from 'components/ui/card'
import { useTranslation } from 'react-i18next'
import { HiCog } from 'react-icons/hi'

const BotControl: React.FC = () => {
	const { t } = useTranslation()

	return (
		<Box>
			<UICardSettings
				title={t('common.status')}
				subTitle={t('info.botControls')}
				icon={HiCog}
				color='orange'
				extras={<Switch size='lg' />}
			></UICardSettings>
		</Box>
	)
}

export default BotControl
