import { Box } from '@chakra-ui/layout'
import { SimpleGrid, ButtonGroup, Button } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'

import { modulesAtom } from 'atom'
import { UICard } from 'components/ui/card'
import { useTranslation } from 'react-i18next'

const Modules: React.FC = () => {
	const { t } = useTranslation()
	const [modules] = useRecoilState(modulesAtom)

	return (
		<Box>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
				{modules.map(({ meta }, idx) => {
					const { id } = meta

					return (
						<UICard
							key={idx}
							title={t(`module.${id}.name`)}
							subTitle={t(`module.${id}.info`)}
						>
							<ButtonGroup size='sm'>
								<Button>{t('common.install')}</Button>
								<Button variant='outline'>{t('common.learnMore')}</Button>
							</ButtonGroup>
						</UICard>
					)
				})}
			</SimpleGrid>
		</Box>
	)
}

export default Modules
