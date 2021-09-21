import { useState } from 'react'
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
	Spacer,
	ButtonGroup,
	Divider,
} from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import { HiPencil, HiPlus, HiTrash, HiX } from 'react-icons/hi'

import { UICard } from 'components/ui/card'

export type ConditionsData = { type: 'fullMatch' | 'regExp'; text: string }
interface ConditionsState {
	data: ConditionsData[]
	entry: boolean
	editing: boolean
	mode: 'all' | 'random'
}
interface ConditionsProps {
	onSave: (value: { data: ConditionsData[] }) => void
}

export const Conditions: React.FC<ConditionsProps> = ({ onSave }) => {
	let ConditionTypes = {
		fullMatch: 'FULL MATCH',
		regExp: 'REGEXP',
	}

	const [conditions, setConditions] = useState<ConditionsState>({
		data: [],
		entry: false,
		editing: false,
		mode: 'all',
	})

	const Entry = () => {
		const { register, handleSubmit } = useForm()

		const onSubmit = (data: any) => {
			const newData = [...conditions.data]
			newData.push(data)
			setConditions({ ...conditions, data: newData, entry: false })

			onSave({ data: newData })
		}

		return (
			<Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={4}>
						<FormControl>
							<FormLabel>Condition Type</FormLabel>
							<Select placeholder='Select condition' {...register('type')}>
								<option value='fullMatch'>Full match</option>
								<option value='regExp'>Regular Expression</option>
							</Select>
						</FormControl>

						<FormControl>
							<FormLabel>Condition Text</FormLabel>
							<Input {...register('text')} />
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
				{conditions.data.map((data, idx) => {
					return (
						<Box key={idx}>
							<Divider mb={2} />
							<Flex alignItems='center'>
								<Box>
									<Text>{data.text}</Text>
									<Text fontSize='xs'>{ConditionTypes[data.type]}</Text>
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
											const prevData = [...conditions.data]
											prevData.splice(idx, 1)
											setConditions({ ...conditions, data: prevData })
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
			title='Conditions'
			extras={
				<IconButton
					aria-label='plus'
					size='sm'
					icon={!conditions.entry ? <HiPlus /> : <HiX />}
					onClick={() =>
						setConditions({ ...conditions, entry: !conditions.entry })
					}
				/>
			}
		>
			{conditions.entry ? <Entry /> : <List />}
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
	onSave: (e: { data: ActionsData[] }) => void
}

export const Actions: React.FC<ActionsProps> = ({ onSave }) => {
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
		data: [],
		entry: false,
	})

	const { register, handleSubmit } = useForm()

	const onSubmit = (data: any) => {
		const newData = [...actions.data]
		newData.push(data)
		setActions({ ...actions, data: newData, entry: false })

		onSave({ data: newData })
	}

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
							<Input {...register('text')} />
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
								<Box>
									<Text>{data.text}</Text>
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
