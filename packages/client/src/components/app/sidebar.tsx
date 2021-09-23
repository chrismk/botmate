import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
	HiHome,
	HiChat,
	HiCog,
	HiUsers,
	HiCube,
	HiLightBulb,
} from 'react-icons/hi'
import { IconType } from 'react-icons/lib'
import { useRecoilState } from 'recoil'
import { commonAtom } from 'atom'
import { useEffect, useMemo, useState } from 'react'
import useFetch from 'use-http'

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
	const [common] = useRecoilState(commonAtom)
	const [latest, setLatest] = useState('')
	const githubApi = useFetch(
		'https://api.github.com/repos/botmate/botmate/releases'
	)

	const FetchLatestVersion = () => {
		githubApi.get().then((releases) => {
			const latest = releases[0]
			setLatest(latest.name)
		})
	}

	useEffect(() => {
		FetchLatestVersion()
	}, [])

	const latestAvailable = useMemo(
		() => latest !== '' && latest !== `v${common.version}`,
		[latest]
	)

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
		modules: {
			name: t('common.modules'),
			icon: <HiCube />,
		},
		suggestions: {
			name: t('common.suggestions'),
			icon: <HiLightBulb />,
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
			<Box pos='absolute' bottom={0} textAlign='center' w='full'>
				<Text
					textColor='gray.100'
					bg={latestAvailable ? 'orange.300' : 'brand.300'}
					py={2}
				>
					v{common.version}
				</Text>
			</Box>
		</Box>
	)
}

export default AppSidebar
