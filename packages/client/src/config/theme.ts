import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

let theme = extendTheme({
	fonts: {
		heading: 'Inter',
		body: 'Oxygen',
	},
	colors: {
		brand: {
			'50': '#eaebfb',
			'100': '#cacbf4',
			'200': '#a7aaed',
			'300': '#8388e6',
			'400': '#686ce0',
			'500': '#4f50d8',
			'600': '#4947cd',
			'700': '#403cc1',
			'800': '#3931b5',
			'900': '#2e1a9e',
		},
	},
})

theme = extendTheme(
	theme,
	withDefaultColorScheme({
		colorScheme: 'brand',
	})
)

export default theme
