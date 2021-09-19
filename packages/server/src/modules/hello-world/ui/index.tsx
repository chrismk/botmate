import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { Box, Heading } from '@chakra-ui/react'

const Main = () => {
	return (
		<Box>
			<Heading>Hello World</Heading>
		</Box>
	)
}

const reactString = ReactDOMServer.renderToString(<Main />)
export default reactString
