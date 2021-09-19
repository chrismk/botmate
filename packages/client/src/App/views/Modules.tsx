import {
	Box,
	SimpleGrid,
	ButtonGroup,
	Button,
	useToast,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import realsync from 'providers/realsync'
import { modulesAtom } from 'atom'

import { UICard } from 'components/ui/card'
import { useBotPicker } from 'components/modules/bot-picker'
import { useState } from 'react'

let moduleId = '0'

const Modules: React.FC = () => {
	const { t } = useTranslation()
	const [modules] = useRecoilState(modulesAtom)
	const [installing, setInstalling] = useState('')
	const toast = useToast()

	const { Picker, botPicker } = useBotPicker()

	const installModule = async (botId: number) => {
		setInstalling(moduleId)
		const result: any = await realsync.service('module/install', {
			botId,
			moduleId,
		})
		if (result.error) {
			toast({ status: 'error', description: t(`error.${result.error}`) })
		} else {
			toast({ description: t('common.success') })
		}
		setInstalling('')
	}

	return (
		<Box>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
				{Object.keys(modules).map((id, idx) => {
					return (
						<UICard
							key={idx}
							title={t(`module.${id}.name`)}
							subTitle={t(`module.${id}.info`)}
						>
							<ButtonGroup size='sm'>
								<Button
									onClick={() => {
										moduleId = id
										botPicker.onOpen()
									}}
									isLoading={installing === id}
								>
									{t('common.install')}
								</Button>
								<Button variant='outline'>{t('common.learnMore')}</Button>
							</ButtonGroup>
						</UICard>
					)
				})}
			</SimpleGrid>

			<Picker
				onSelect={(botId) => {
					installModule(botId)
				}}
			/>
		</Box>
	)
}

export default Modules
