import { Stack } from '@chakra-ui/layout'

import Languages from 'components/settings/languages'
import ColorSwticher from 'components/settings/color-switcher'

const Settings: React.FC = () => {
	return (
		<Stack>
			<Languages />
			<ColorSwticher />
		</Stack>
	)
}

export default Settings
