import { SimpleGrid, GridItem, Stack } from '@chakra-ui/layout'
import { Redirect, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Bot } from 'atom'
import BotControl from 'components/bots/controls'
import UIBreadcrumb from 'components/ui/breadcrumb'
import { UICard } from 'components/ui/card'

const BotEditor: React.FC = (props) => {
	const { t } = useTranslation()
	const { state: bot } = useLocation<Bot>()

	if (!bot) {
		return <Redirect to='/home' />
	}

	return (
		<Stack spacing={4}>
			<UIBreadcrumb
				steps={[
					{ name: t('common.bots'), link: '/bots' },
					{ name: bot.name, link: '' },
				]}
			/>

			<SimpleGrid columns={5} spacing={4}>
				<Stack as={GridItem} colSpan={{ base: 5, md: 2 }}>
					<BotControl />

					<UICard title={t('common.modules')}></UICard>
				</Stack>

				<GridItem colSpan={{ base: 5, md: 3 }}></GridItem>
			</SimpleGrid>
		</Stack>
	)
}

export default BotEditor
