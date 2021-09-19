import { useEffect, useState } from 'react'
import { VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRecoilState } from 'recoil'

import realsync from 'providers/realsync'
import { botsAtom, commonAtom, installedModulesAtom, modulesAtom } from 'atom'

const Wrapper: React.FC = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const [, setBots] = useRecoilState(botsAtom)
	const [, setCommon] = useRecoilState(commonAtom)
	const [, setModules] = useRecoilState(modulesAtom)
	const [, setInstalledModules] = useRecoilState(installedModulesAtom)

	const FetchData = async () => {
		const allBots: any = await realsync.service('bot/all', {})
		const modules: any = await realsync.service('bot/all-modules', {})
		const installedModules: any = await realsync.service(
			'bot/installed-modules',
			{}
		)
		const common: any = await realsync.service('common', {})

		setModules(modules)
		setBots(allBots)
		setCommon(common)
		setInstalledModules(installedModules)

		setLoading(false)
	}

	useEffect(() => {
		FetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (loading) {
		return (
			<VStack mt={24}>
				<Spinner />
			</VStack>
		)
	}

	return <div>{children}</div>
}

export default Wrapper
