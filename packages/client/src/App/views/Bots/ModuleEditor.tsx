import { useMemo } from 'react'
import { Bot } from 'atom'
import { Box, SimpleGrid } from '@chakra-ui/layout'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'

import ModuleField, { FieldType } from 'components/modules/field'
import UIBreadcrumb from 'components/ui/breadcrumb'

interface StateProps {
	bot: Bot
	module: {
		id: string
		// todo: crete separate type for fields
		fields: {
			[key: string]: {
				type: FieldType
				useCard: boolean
			}
		}
	}
}

const ModuleEditor: React.FC = () => {
	const { t } = useTranslation()
	const {
		state: { bot, module },
	} = useLocation<StateProps>()

	const fields = useMemo(() => module.fields, [module])

	return (
		<Box>
			<UIBreadcrumb
				state={bot}
				steps={[
					{ name: t('common.bots'), link: '/bots' },
					{ name: bot.name, link: '/bots/' + bot.id },
					{ name: t(`module.${module.id}.name`), link: '' },
				]}
			/>

			<SimpleGrid columns={{ base: 1, md: 2, '2xl': 3 }} spacing={4} mt={4}>
				{Object.keys(fields).map((key, idx) => {
					const field = fields[key]
					const name = t(`module.${module.id}.fields.${key}.name`)
					const info = t(`module.${module.id}.fields.${key}.info`)

					return (
						<ModuleField
							key={idx}
							name={name}
							info={info}
							placeholder={key}
							type={field.type}
						/>
					)
				})}
			</SimpleGrid>
		</Box>
	)
}

export default ModuleEditor
