import { useEffect, useMemo, useState } from 'react'
import {
	SimpleGrid,
	GridItem,
	Stack,
	Box,
	Heading,
	Text,
} from '@chakra-ui/layout'
import { Redirect, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Bot, installedModulesAtom } from 'atom'
import BotControl from 'components/bots/controls'
import UIBreadcrumb from 'components/ui/breadcrumb'
import { UICard } from 'components/ui/card'
import { useRecoilState } from 'recoil'
import { Button, ButtonGroup } from '@chakra-ui/button'

const BotEditor: React.FC = (props) => {
	const { t } = useTranslation()
	const { state: bot } = useLocation<Bot>()
	const [installedModules] = useRecoilState(installedModulesAtom)

	const botModules = useMemo(
		() => installedModules[bot.id],
		[bot.id, installedModules]
	)

	if (!bot) {
		return <Redirect to='/home' />
	}

	return (
		<Stack spacing={4}>
			<UIBreadcrumb
				steps={[
					{ name: t('common.bots'), link: '/bots' },
					{ name: bot.name, link: '' },
				]}
			/>

			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
				<BotControl />
			</SimpleGrid>

			<Heading size='md' mb={2}>
				Modules
			</Heading>

			<SimpleGrid columns={{ base: 1, md: 3, '2xl': 4 }}>
				{botModules.map((module, idx) => {
					const name = t(`module.${module.id}.name`)
					const info = t(`module.${module.id}.info`)

					return (
						<UICard title={name} key={idx} subTitle={info}>
							<ButtonGroup size='sm'>
								<Button>{t('common.configure')}</Button>
								<Button colorScheme='red'>{t('common.disable')}</Button>
							</ButtonGroup>
						</UICard>
					)
				})}
			</SimpleGrid>
		</Stack>
	)
}

export default BotEditor
