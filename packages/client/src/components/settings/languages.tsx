import { Box, Text, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import { HiGlobe } from 'react-icons/hi'

import { UICardSettings } from 'components/ui/card'
import { languages } from 'config/languages'
import i18next from 'i18next'

const Languages: React.FC = () => {
	const { t } = useTranslation()

	return (
		<Box>
			<UICardSettings
				title={t('common.language')}
				subTitle={t('info.language')}
				icon={HiGlobe}
				color='brand'
			>
				<Flex userSelect='none' spacing={8} flexFlow='wrap'>
					{Object.keys(languages).map((lng, idx) => {
						const lang = languages[lng]
						const isActive = i18n.language === lng

						return (
							<Text
								key={idx}
								fontSize='xl'
								fontWeight='semibold'
								textColor={isActive ? 'brand.400' : 'gray.400'}
								cursor='pointer'
								mr={4}
								onClick={() => i18next.changeLanguage(lng)}
							>
								{lang.name}
							</Text>
						)
					})}
				</Flex>
			</UICardSettings>
		</Box>
	)
}

export default Languages
