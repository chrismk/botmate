import { Stack, SimpleGrid } from '@chakra-ui/layout'

import Languages from 'components/settings/languages'
import ColorSwticher from 'components/settings/color-switcher'
import { Button } from '@chakra-ui/button'
import { HiHeart } from 'react-icons/hi'

const Settings: React.FC = () => {
	return (
		<Stack>
			<SimpleGrid columns={{ base: 1, '2xl': 2 }} spacing={4}>
				<Languages />
				<ColorSwticher />
			</SimpleGrid>
			<a
				href='https://opencollective.com/botmate'
				target='_blank'
				rel='noreferrer'
			>
				<Button
					colorScheme='orange'
					variant='link'
					fontWeight='thin'
					mt={2}
					leftIcon={<HiHeart />}
				>
					Support BotMate development
				</Button>
			</a>
		</Stack>
	)
}

export default Settings
