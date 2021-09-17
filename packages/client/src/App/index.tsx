import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import AppSidebar from '../components/app/sidebar'

const App: React.FC = () => {
	return (
		<div>
			<Flex h='100vh'>
				<Box
					w={{ base: '24', md: '36' }}
					h='100vh'
					shadow='lg'
					overflow='auto'
					css={{
						'&::-webkit-scrollbar': {
							width: '0px',
						},
						'&::-webkit-scrollbar-track': {
							width: '0px',
						},
						'&::-webkit-scrollbar-thumb': {
							borderRadius: '0px',
						},
					}}
				>
					<AppSidebar />
				</Box>
				<Box></Box>
			</Flex>
		</div>
	)
}

export default App
