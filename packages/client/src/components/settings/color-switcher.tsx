import { Box, Text } from '@chakra-ui/react'
import { UICardSettings } from 'components/ui/card'
import { useTranslation } from 'react-i18next'
import { HiColorSwatch } from 'react-icons/hi'

const ColorSwticher: React.FC = () => {
	const { t } = useTranslation()

	return (
		<Box>
			<UICardSettings
				title={t('common.color')}
				subTitle={t('info.colorPicker')}
				icon={HiColorSwatch}
				color='green'
			>
				<Text>Coming soon</Text>
			</UICardSettings>
		</Box>
	)
}

export default ColorSwticher
