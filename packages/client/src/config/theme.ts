import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
	fonts: {
		heading: 'Open Sans',
		body: 'Roboto',
	},
	colors: {
		brand: {
			'50': '#ede7f7',
			'100': '#d2c4eb',
			'200': '#b49cde',
			'300': '#9774d1',
			'400': '#8055c6',
			'500': '#6937bc',
			'600': '#5f32b6',
			'700': '#522aad',
			'800': '#4524a5',
			'900': '#301798',
		},
	},
})

export default theme
