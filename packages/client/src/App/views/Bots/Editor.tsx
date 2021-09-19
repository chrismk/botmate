import { useEffect, useMemo, useState } from 'react'
import { SimpleGrid, GridItem, Stack } from '@chakra-ui/layout'
import { Redirect, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Bot } from 'atom'
import BotControl from 'components/bots/controls'
import UIBreadcrumb from 'components/ui/breadcrumb'
import { UICard } from 'components/ui/card'
import realsync from 'providers/realsync'

const BotEditor: React.FC = (props) => {
	const { t } = useTranslation()
	const { state: bot } = useLocation<Bot>()
	const [installedModules, setInstalledModules] = useState([])
	console.log('installedModules', installedModules)

	const FetchInstalledModules = async () => {
		const result: any = await realsync.service('bot/installed-modules', {})
		setInstalledModules(result)
	}

	useEffect(() => {
		FetchInstalledModules()
	}, [])

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
