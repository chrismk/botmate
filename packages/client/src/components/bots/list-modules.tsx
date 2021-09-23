import { useEffect, useState } from 'react'
import { SimpleGrid, GridItem, Center, Text } from '@chakra-ui/layout'
import { Redirect, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, ButtonGroup } from '@chakra-ui/button'
import { useRecoilState } from 'recoil'
import { Bot, InstalledModule, modulesAtom } from 'atom'

import { UICard } from 'components/ui/card'
import realsync from 'providers/realsync'
import { Spinner } from '@chakra-ui/spinner'

const ListModules: React.FC = () => {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(true)
	const { state: bot, pathname } = useLocation<Bot>()
	const [installedModules, setInstallModules] = useState<InstalledModule[]>([])
	const [modules] = useRecoilState(modulesAtom)

	const Fetch = async () => {
		const data = await realsync.service('module/active', bot.id)
		setInstallModules(data as InstalledModule[])
		setLoading(false)
	}

	useEffect(() => {
		Fetch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!bot) {
		return <Redirect to='/home' />
	}

	if (loading) {
		return (
			<Center>
				<Spinner />
			</Center>
		)
	}

	if (!loading && installedModules.length == 0) {
		return (
			<Center>
				<Text>No modules found</Text>
			</Center>
		)
	}

	return (
		<SimpleGrid columns={{ base: 1, lg: 2, '2xl': 3 }} spacing={4}>
			{installedModules.map((module, idx) => {
				const name = t(`module.${module.moduleId}.name`)
				const info = t(`module.${module.moduleId}.info`)

				const moduleData = modules[module.moduleId]
				if (!moduleData) {
					return null
				}

				return (
					<GridItem key={idx}>
						<UICard title={name} subTitle={info}>
							<ButtonGroup size='sm'>
								<Link
									to={{
										pathname: `${pathname}/${module.moduleId}`,
										state: {
											bot,
											module: moduleData.meta,
											config: module.config,
										},
									}}
								>
									<Button>{t('common.configure')}</Button>
								</Link>
							</ButtonGroup>
						</UICard>
					</GridItem>
				)
			})}
		</SimpleGrid>
	)
}

export default ListModules
