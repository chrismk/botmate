import { Stack, SimpleGrid } from '@chakra-ui/layout'

import Languages from 'components/settings/languages'
import ColorSwticher from 'components/settings/color-switcher'

const Settings: React.FC = () => {
	return (
		<Stack>
			<SimpleGrid columns={{ base: 1, '2xl': 2 }} spacing={4}>
				<Languages />
				<ColorSwticher />
			</SimpleGrid>
		</Stack>
	)
}

export default Settings
