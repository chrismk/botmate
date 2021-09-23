import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	Flex,
	Stack,
	Box,
	Text,
	Button,
	IconButton,
	Select,
	Input,
	Textarea,
	Spacer,
	ButtonGroup,
	Divider,
} from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import { HiPlus, HiTrash } from 'react-icons/hi'

import { UICard } from 'components/ui/card'
import ButtonBuilder from 'components/app/button-builder'

export type ConditionData = { type: 'fullMatch' | 'regExp'; text: string }
interface ConditionState {
	data: ConditionData
	entry: boolean
	editing: boolean
	mode: 'all' | 'random'
}
interface ConditionsProps {
	def?: ConditionData
	onSave: (value: { data: ConditionData }) => void
}

export const Condition: React.FC<ConditionsProps> = ({ def, onSave }) => {
	let ConditionTypes = {
		fullMatch: 'FULL MATCH',
		regExp: 'REGEXP',
	}

	const [condition, setCondition] = useState<ConditionState>({
		data: def || { type: 'fullMatch', text: '' },
		entry: false,
		editing: false,
		mode: 'all',
	})

	useEffect(() => {
		onSave({ data: condition.data })
	}, [condition])

	return (
		<UICard title='Condition'>
			<Box>
				<Stack spacing={4}>
					<FormControl>
						<FormLabel>Condition Type</FormLabel>
						<Select
							defaultValue={condition.data.type}
							placeholder='Select condition'
							onChange={(e) => {
								const value = e.target.value
								const prevData: any = condition.data // todo: remove any
								prevData.type = value

								setCondition({ ...condition, data: prevData })
							}}
						>
							<option value='fullMatch'>Full match</option>
							<option value='regExp'>Regular Expression</option>
						</Select>
					</FormControl>

					<FormControl>
						<FormLabel>Condition Text</FormLabel>
						<Input
							defaultValue={condition.data.text}
							onChange={(e) => {
								const value = e.target.value
								const prevData: any = condition.data // todo: remove any
								prevData.text = value

								setCondition({ ...condition, data: prevData })
							}}
						/>
					</FormControl>
				</Stack>
			</Box>
		</UICard>
	)
}

export type ActionsData = {
	type: 'text' | 'photo' | 'sticker' | 'http'
	text: string
}
interface ActionsState {
	data: ActionsData[]
	entry: boolean
}
interface ActionsProps {
	def?: ActionsData[]
	onSave: (e: { data: ActionsData[] }) => void
}

export const Actions: React.FC<ActionsProps> = ({ def, onSave }) => {
	const [buttons, setButtons] = useState<any[][]>([])
	let ActionTypes = [
		'text',
		'photo',
		'sticker',
		'http',
		'ban',
		'kick',
		'restrict',
	]

	const [actions, setActions] = useState<ActionsState>({
		data: def || [],
		entry: false,
	})

	const { register, handleSubmit } = useForm()

	const onSubmit = (data: any) => {
		data.buttons = buttons
		const newData = [...actions.data]
		newData.push(data)
		setActions({ ...actions, data: newData, entry: false })
	}

	useEffect(() => {
		onSave({ data: actions.data })
	}, [actions])

	const Entry: React.FC = () => {
		return (
			<Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={4}>
						<FormControl>
							<FormLabel>Action Type</FormLabel>
							<Select placeholder='Select action type' {...register('type')}>
								{ActionTypes.map((type: any, idx) => (
									<option key={idx} value={type}>
										{type}
									</option>
								))}
							</Select>
						</FormControl>

						<FormControl>
							<FormLabel>Action Text</FormLabel>
							<Textarea resize='none' {...register('text')} />
						</FormControl>

						<FormControl>
							<FormLabel>Buttons</FormLabel>
							<ButtonBuilder
								defValue={buttons}
								onChange={(btns) => {
									setButtons(btns)
								}}
							/>
						</FormControl>

						<Button type='submit' variant='outline'>
							Done
						</Button>
					</Stack>
				</form>
			</Box>
		)
	}

	const List = () => {
		return (
			<Stack spacing={4}>
				{actions.data.map((data, idx) => {
					return (
						<Box key={idx}>
							<Divider mb={2} />
							<Flex alignItems='center'>
								<Box overflow='hidden'>
									<Text noOfLines={1} textOverflow='ellipsis'>
										{data.text}
									</Text>
									<Text fontSize='xs'>{data.type}</Text>
								</Box>
								<Spacer />
								<ButtonGroup size='sm'>
									{/* <IconButton
										aria-label='edit'
										colorScheme='purple'
										icon={<HiPencil />}
									/> */}
									<IconButton
										aria-label='edit'
										colorScheme='red'
										icon={<HiTrash />}
										onClick={() => {
											const prevData = [...actions.data]
											prevData.splice(idx, 1)
											setActions({ ...actions, data: prevData })
										}}
									/>
								</ButtonGroup>
							</Flex>
						</Box>
					)
				})}
			</Stack>
		)
	}

	return (
		<UICard
			title='Actions'
			extras={
				<IconButton
					aria-label='plus'
					size='sm'
					icon={<HiPlus />}
					onClick={() => setActions({ ...actions, entry: !actions.entry })}
				/>
			}
		>
			{actions.entry ? <Entry /> : <List />}
		</UICard>
	)
}

export const Extras: React.FC = () => {
	return (
		<UICard
			title='Extras'
			extras={<IconButton aria-label='plus' size='sm' icon={<HiPlus />} />}
		>
			<Text>Coming soon</Text>
		</UICard>
	)
}
