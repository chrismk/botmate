import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
	fonts: {
		heading: 'Inter',
		body: 'Oxygen',
	},
	colors: {
		brand: {
			'50': '#e8ecfe',
			'100': '#c5cefc',
			'200': '#9daffa',
			'300': '#6f8ff9',
			'400': '#4575f6',
			'500': '#125bec',
			'600': '#0352e1',
			'700': '#0047d3',
			'800': '#003dc6',
			'900': '#0029af',
		},
	},
})

export default theme
