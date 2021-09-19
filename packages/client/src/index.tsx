import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import './i18n'

import App from 'App'
import theme from 'config/theme'
import Wrapper from 'components/wrapper'
import { RtlProvider } from 'providers/rtl'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<Suspense fallback={'Loading...'}>
					<RecoilRoot>
						<Wrapper>
							<RtlProvider>
								<App />
							</RtlProvider>
						</Wrapper>
					</RecoilRoot>
				</Suspense>
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
