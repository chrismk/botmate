import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { HiHome, HiChat, HiCog, HiUsers } from 'react-icons/hi'
import { IconType } from 'react-icons/lib'

interface AppSidebarItemProps {
	isActive: boolean
	item: {
		name: string
		icon: IconType
	}
}

const AppSidebarItem: React.FC<AppSidebarItemProps> = ({ isActive, item }) => {
	return (
		<Flex
			px={2}
			py={2}
			rounded='xl'
			alignItems='center'
			transition='all 200ms'
			cursor='pointer'
			bg={isActive ? `brand.50` : 'transparent'}
			textColor={isActive ? `brand.400` : 'gray.300'}
		>
			<Box fontSize={{ base: '3xl', md: '3xl' }}>{item.icon}</Box>
			<Text ml={2} d={{ base: 'none', md: 'unset' }} size='sm'>
				{item.name}
			</Text>
		</Flex>
	)
}

interface Props {
	active: string
}

const AppSidebar: React.FC<Props> = ({ active }) => {
	const { t } = useTranslation()

	const SidebarItems: any = {
		home: {
			name: t('common.home'),
			icon: <HiHome />,
		},
		bots: {
			name: t('common.bots'),
			icon: <HiChat />,
		},
		contributors: {
			name: t('common.contributors'),
			icon: <HiUsers />,
		},
		settings: {
			name: t('common.settings'),
			icon: <HiCog />,
		},
	}

	const itemKeys = Object.keys(SidebarItems)
	return (
		<Box
			pos='relative'
			w={{ base: '24', md: '64', '2xl': '80' }}
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
			<Stack userSelect='none' p={4} py={8}>
				{itemKeys.map((key) => {
					const item = SidebarItems[key]
					const isActive = active === key

					return (
						<Link to={`/${key}`} key={key}>
							<AppSidebarItem isActive={isActive} item={item} />
						</Link>
					)
				})}
			</Stack>
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
