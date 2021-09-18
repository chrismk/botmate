import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Route, Switch, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'

import AppSidebar from '../components/app/sidebar'

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

	return (
		<div>
			<Flex h='100vh'>
				<AppSidebar active={location.pathname.replace('/', '')} />
				<Box>
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
			</Flex>
		</div>
	)
}

export default App
