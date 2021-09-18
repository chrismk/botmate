import { Box, VStack, Heading, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { HiOutlineHome, HiOutlineChat, HiOutlineCog } from 'react-icons/hi'

interface Props {
	active: string
}

const AppSidebar: React.FC<Props> = ({ active }) => {
	const { t } = useTranslation()

	const SidebarItems: any = {
		home: {
			name: t('common.home'),
			icon: <HiOutlineHome />,
			color: 'brand.300',
		},
		bots: {
			name: t('common.bots'),
			icon: <HiOutlineChat />,
			color: 'orange.400',
		},
		settings: {
			name: t('common.settings'),
			icon: <HiOutlineCog />,
			color: 'green.400',
		},
	}

	const itemKeys = Object.keys(SidebarItems)
	return (
		<Box
			pos='relative'
			w={{ base: '24', md: '36' }}
			h='100vh'
			borderRightWidth='1px'
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
			<Box
				pos='absolute'
				bottom={4}
				textAlign='center'
				w='full'
				textColor='gray.500'
			>
				<Text>v2.3.6</Text>
			</Box>
		</Box>
	)
}

export default AppSidebar
