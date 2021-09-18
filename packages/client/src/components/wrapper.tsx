import { useEffect, useState } from 'react'
import { VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRecoilState } from 'recoil'

import realsync from 'providers/realsync'
import { botsAtom } from 'atom'

const Wrapper: React.FC = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const [bots, setBots] = useRecoilState(botsAtom)

	const FetchData = async () => {
		const allBots: any = await realsync.service('bot/all', {})
		setBots(allBots)

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
