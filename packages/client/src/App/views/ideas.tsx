import { Box } from '@chakra-ui/layout'
import { Center, Button } from '@chakra-ui/react'

const Ideas: React.FC = () => {
	return (
		<Box>
			<Center mt={{ base: 12, md: 24 }}>
				<a href='https://t.me/botmate' target='_blank'>
					<Button variant='outline'>Join Telergam Chat for Suggestions</Button>
				</a>
			</Center>
		</Box>
	)
}

export default Ideas
