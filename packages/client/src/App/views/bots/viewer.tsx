import { SimpleGrid, Stack, Heading, GridItem } from '@chakra-ui/layout'
import { Redirect, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Bot } from 'atom'

import BotControl from 'components/bots/controls'
import UIBreadcrumb from 'components/ui/breadcrumb'
import ListModules from 'components/bots/list-modules'
import ListCommands from 'components/bots/list-commands'
import ListRoles from 'components/bots/list-roles'

const BotViewer: React.FC = () => {
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

			<SimpleGrid columns={10} spacing={4}>
				<GridItem colSpan={{ base: 10, md: 5, '2xl': 6 }}>
					<SimpleGrid columns={{ base: 1, xl: 2 }} spacing={4}>
						<BotControl />
					</SimpleGrid>

					<Heading size='md' my={4}>
						Modules
					</Heading>
					<ListModules />
				</GridItem>

				<GridItem colSpan={{ base: 10, md: 5, '2xl': 4 }}>
					<Stack>
						<ListCommands />
						<ListRoles />
					</Stack>
				</GridItem>

				<GridItem colSpan={{ base: 10, md: 5, '2xl': 4 }}></GridItem>
			</SimpleGrid>
		</Stack>
	)
}

export default BotViewer
