import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import AppSidebar from '../components/app/sidebar'

const App: React.FC = () => {
	return (
		<div>
			<Flex h='100vh'>
				<AppSidebar />
				<Box></Box>
			</Flex>
		</div>
	)
}

export default App
