import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import './i18n'
import App from './App'
import theme from './config/theme'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<Suspense fallback={'Loading...'}>
					<App />
				</Suspense>
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
