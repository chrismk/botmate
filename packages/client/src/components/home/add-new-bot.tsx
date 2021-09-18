import { Box } from '@chakra-ui/layout'
import { UICard } from 'components/ui/card'
import { useTranslation } from 'react-i18next'

import { FormControl, FormLabel, FormHelperText, Input } from '@chakra-ui/react'

const AddNewBot: React.FC = () => {
	const { t } = useTranslation()

	return (
		<Box>
			<UICard title={t('home.addNewBot')}>
				<FormControl id='email'>
					<FormLabel>{t('common.botToken')}</FormLabel>
					<Input type='text' />
					<FormHelperText>{t('info.botToken')}</FormHelperText>
				</FormControl>
			</UICard>
		</Box>
	)
}

export default AddNewBot
