import { useRef } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { UICard } from 'components/ui/card'
import { useTranslation } from 'react-i18next'
import { FormControl, FormLabel, FormHelperText, Input } from '@chakra-ui/react'

const AddNewBot: React.FC = () => {
	const { t } = useTranslation()
	const botTokenInput = useRef(null)

	const Submit = async () => {}

	return (
		<Box>
			<UICard title={t('home.addNewBot')}>
				<FormControl id='email'>
					<FormLabel>{t('common.botToken')}</FormLabel>
					<Input ref={botTokenInput} type='text' />
					<FormHelperText>{t('info.botToken')}</FormHelperText>
				</FormControl>
				<Button onClick={Submit}>{t('common.submit')}</Button>
			</UICard>
		</Box>
	)
}

export default AddNewBot
