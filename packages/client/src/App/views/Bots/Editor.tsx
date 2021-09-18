import { Box } from '@chakra-ui/layout'
import { useLocation } from 'react-router'

import UIBreadcrumb from 'components/ui/breadcrumb'
import { useTranslation } from 'react-i18next'
import { Bot } from 'atom'

const BotEditor: React.FC = (props) => {
	const { t } = useTranslation()
	const { state: bot } = useLocation<Bot>()

	if (!bot) {
		return <Redirect to='/home' />
	}

	return (
		<Box>
			<UIBreadcrumb
				steps={[
					{ name: t('common.bots'), link: '/bots' },
					{ name: bot.name, link: '' },
				]}
			/>
		</Box>
	)
}

export default BotEditor
