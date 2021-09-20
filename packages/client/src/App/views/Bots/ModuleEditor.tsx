import { Bot } from 'atom'
import { Box, GridItem, SimpleGrid } from '@chakra-ui/layout'
import { useTranslation } from 'react-i18next'
import { useLocation, Redirect } from 'react-router-dom'

import ModuleField, { FieldType } from 'components/modules/field'
import UIBreadcrumb from 'components/ui/breadcrumb'
import { Button } from '@chakra-ui/button'
import realsync from 'providers/realsync'
import { useState } from 'react'

interface StateProps {
	bot: Bot
	module: {
		id: string
		// todo: crete separate type for fields
		fields: {
			[key: string]: {
				type: FieldType
			}
		}
	}
	config?: any
}

const ModuleEditor: React.FC = () => {
	const { t } = useTranslation()
	const { state } = useLocation<StateProps>()
	const [loading, setLoading] = useState(false)

	if (!state) {
		return <Redirect to='/home' />
	}

	const { bot, module, config } = state
	const { fields } = module

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
					const placeholder = t(`module.${module.id}.fields.${key}.placeholder`)

					return (
						<GridItem key={idx}>
							<ModuleField
								id={key}
								module={module.id}
								botId={bot.id}
								name={name}
								info={info}
								placeholder={placeholder}
								type={field.type}
								defValue={config[key]}
							/>
						</GridItem>
					)
				})}
				<GridItem>
					<Button
						isLoading={loading}
						colorScheme='red'
						onClick={async () => {
							setLoading(true)
							await realsync.service('module/remove', {
								moduleId: module.id,
								botId: bot.id,
							})
							setLoading(false)
							window.location.href = '/home'
						}}
					>
						Uninstall
					</Button>
				</GridItem>
			</SimpleGrid>
		</Box>
	)
}

export default ModuleEditor
