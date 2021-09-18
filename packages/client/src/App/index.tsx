import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Route, Switch, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// Components
import AppSidebar from 'components/app/sidebar'
import AppHeader from 'components/app/header'

// Views
import Home from './views/Home'

interface IViews {
	id: string
	path: string
	view: React.FC
}

let Views: IViews[] = [
	{
		id: 'home',
		path: '/home',
		view: Home,
	},
]

const App: React.FC = () => {
	const location = useLocation()
	const { t } = useTranslation()
	const active = location.pathname.replace('/', '')

	return (
		<div>
			<Flex h='100vh'>
				<AppSidebar active={active} />
				<Box w='100%' bg='gray.50'>
					<AppHeader title={t(`common.${active}`)} />

					<Box p={4}>
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
													<motion.div>
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
