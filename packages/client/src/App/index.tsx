import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Route, Switch, Redirect, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// Components
import AppSidebar from 'components/app/sidebar'
import AppHeader from 'components/app/header'

// Views
import Home from './views/Home'
import Bots from './views/Bots'
import BotViewer from './views/Bots/Viewer'
import Settings from './views/Settings'
import Contributors from './views/Contributors'
import Modules from './views/Modules'
import ModuleEditor from './views/Bots/ModuleEditor'
import NewCommand from './views/Bots/NewCommand'
import { EditCommand } from './views/Bots/edit-command'

interface IViews {
	id: string
	path: string
	view: React.FC
}

let Views: IViews[] = [
	{
		id: 'root',
		path: '/',
		view: () => <Redirect to='/home' />,
	},
	{
		id: 'home',
		path: '/home',
		view: Home,
	},
	{
		id: 'bots',
		path: '/bots',
		view: Bots,
	},
	{
		id: 'bot-edit',
		path: '/bots/:botId',
		view: BotViewer,
	},
	{
		id: 'new-command',
		path: '/bots/:botId/new-command',
		view: NewCommand,
	},
	{
		id: 'edit-comman',
		path: '/bots/:botId/edit-command',
		view: EditCommand,
	},
	{
		id: 'module-edit',
		path: '/bots/:botId/:modId',
		view: ModuleEditor,
	},

	{
		id: 'modules',
		path: '/modules',
		view: Modules,
	},
	{
		id: 'contributors',
		path: '/contributors',
		view: Contributors,
	},
	{
		id: 'settings',
		path: '/settings',
		view: Settings,
	},
]

const App: React.FC = () => {
	const location = useLocation()
	const { t } = useTranslation()

	let path: any = location.pathname.match(/^\/(\w+).*/)
	if (path && path.length > 0) {
		path = path[1]
	}

	return (
		<div>
			<Flex h='100vh'>
				<AppSidebar active={path} />
				<Box w='100%' bg='gray.50'>
					<AppHeader title={t(`common.${path}`)} />

					<Box p={{ base: 2, md: 3, lg: 4 }} textColor='gray.500'>
						<AnimatePresence exitBeforeEnter initial={false}>
							<Switch location={location} key={location.pathname}>
								{Views.map((view, idx) => {
									return (
										<Route
											key={idx}
											path={view.path}
											exact
											component={(props: any) => {
												const View = view.view
												return (
													<motion.div
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														exit={{ opacity: 0 }}
														transition={{ duration: 0.2 }}
													>
														<View {...props} />
													</motion.div>
												)
											}}
										/>
									)
								})}
							</Switch>
						</AnimatePresence>
					</Box>
				</Box>
			</Flex>
		</div>
	)
}

export default App
