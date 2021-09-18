import { useRef, useState } from 'react'
import { Box, Button, useToast } from '@chakra-ui/react'
import { UICard } from 'components/ui/card'
import { useTranslation } from 'react-i18next'
import { FormControl, FormLabel, FormHelperText, Input } from '@chakra-ui/react'
import realsync from 'providers/realsync'

const AddNewBot: React.FC = () => {
	const toast = useToast()
	const { t } = useTranslation()
	const botTokenInput = useRef<HTMLInputElement>(null)
	const [loading, setLoading] = useState(false)

	const Submit = async () => {
		setLoading(true)
		try {
			const botInfo: any = await realsync.service('bot/new', [
				botTokenInput.current?.value,
			])

			toast({
				title: t('common.success'),
				description: t('info.botAdded', { name: botInfo.first_name }),
			})
		} catch (err: any) {
			toast({ status: 'error', description: err.toString() })
		}
		setLoading(false)
	}

	return (
		<Box>
			<UICard title={t('home.addNewBot')}>
				<FormControl id='email'>
					<FormLabel>{t('common.botToken')}</FormLabel>
					<Input ref={botTokenInput} type='text' />
					<FormHelperText>{t('info.botToken')}</FormHelperText>
				</FormControl>
				<Button onClick={Submit} isLoading={loading}>
					{t('common.submit')}
				</Button>
			</UICard>
		</Box>
	)
}

export default AddNewBot
