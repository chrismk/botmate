import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import {
	Avatar,
	Box,
	Flex,
	Heading,
	Text,
	SimpleGrid,
	Center,
	Spinner,
} from '@chakra-ui/react'

const AppContributors = () => {
	const contributorApi = useFetch(
		'https://api.github.com/repos/botmate/botmate/contributors'
	)
	const [contributors, setContributors] = useState<any>([])

	const Fetch = async () => {
		contributorApi.get().then((data: any[]) => {
			if (data) setContributors(data)
		})
	}

	useEffect(() => {
		Fetch()
	}, [])

	if (contributorApi.loading) {
		return (
			<Center mt={4}>
				<Spinner />
			</Center>
		)
	}

	return (
		<SimpleGrid
			spacing={6}
			columns={{ base: 1, md: 3, '2xl': 5 }}
			userSelect='none'
		>
			{contributors.map((contributor: any, idx: number) => {
				return (
					<a
						href={`https://github.com/botmate/botmate/commits?author=${contributor.login}`}
						target='_blank'
						rel='noreferrer'
						key={idx}
					>
						<Flex alignItems='center'>
							<Avatar src={contributor.avatar_url} />
							<Box ml={2}>
								<Heading size='md' fontWeight='light'>
									{contributor.login}
								</Heading>
								<Text>{contributor.contributions} contributions</Text>
							</Box>
						</Flex>
					</a>
				)
			})}
		</SimpleGrid>
	)
}

export default AppContributors
