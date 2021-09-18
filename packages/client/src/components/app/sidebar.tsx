import { Box, VStack, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { FiHome, FiPackage } from 'react-icons/fi'

const AppSidebar: React.FC = () => {
	const { t } = useTranslation()

	const SidebarItems: any = {
		home: {
			name: t('common.home'),
			icon: <FiHome />,
			color: 'brand.300',
		},
		modules: {
			name: t('common.modules'),
			icon: <FiPackage />,
			color: 'orange.400',
		},
	}

	const itemKeys = Object.keys(SidebarItems)
	return (
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
			<VStack userSelect='none' spacing={12} py={8}>
				{itemKeys.map((key, idx) => {
					const item = SidebarItems[key]
					let active = idx === 1 ? 't' : 'x'
					const activeColor = active === key ? item.color : 'gray.500'

					return (
						<Link to={`/${key}`} key={key}>
							<VStack
								alignItems='center'
								transition='color 200ms'
								_hover={{ textColor: item.color }}
								cursor='pointer'
								textColor={activeColor}
							>
								<Box fontSize={{ base: '3xl', '2xl': '3xl' }}>{item.icon}</Box>
								<Heading d={{ base: 'none', md: 'unset' }} size='sm'>
									{item.name}
								</Heading>
							</VStack>
						</Link>
					)
				})}
			</VStack>
		</Box>
	)
}

export default AppSidebar
