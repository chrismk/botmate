import { useRef, useState } from 'react'
import { Box, Button, Input, Flex, Stack } from '@chakra-ui/react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	ButtonGroup,
} from '@chakra-ui/react'
import { HiCheck, HiTrash } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

type Buttons = any[][]

interface Props {
	onChange: (buttons: Buttons) => void
	defValue: any
}

interface ModalState {
	row?: number
	visible: boolean
	edit?: boolean
	_row?: number
	_col?: number
	_text?: string
	_url?: string
}

const ButtonBuilder: React.FC<Props> = (props) => {
	const buttonText = useRef<HTMLInputElement>(null)
	const buttonUrl = useRef<HTMLInputElement>(null)
	const { t } = useTranslation()

	const [newColModal, setNewColModal] = useState<ModalState>({
		row: 0,
		visible: false,
		edit: false,
		_row: 0,
		_col: 0,
		_text: '',
		_url: '',
	})
	const [rows, setRows] = useState<Buttons>(props.defValue || [])

	return (
		<Box>
			<Stack spacing={4}>
				{rows.map((row, ridx) => {
					const cols = row
					return (
						<Flex key={ridx}>
							{cols.map((col, cidx) => {
								return (
									<Button
										mr={2}
										size='xs'
										colorScheme='gray'
										key={cidx}
										onClick={() => {
											setNewColModal({
												...newColModal,
												visible: true,
												edit: true,
												_text: col.text,
												_url: col.url,
												_row: ridx,
												_col: cidx,
											})
										}}
									>
										{col.text}
									</Button>
								)
							})}
							<Button
								size='xs'
								onClick={() =>
									setNewColModal({ ...newColModal, visible: true, row: ridx })
								}
							>
								+ col
							</Button>
						</Flex>
					)
				})}
			</Stack>
			<Button
				mt={2}
				size='xs'
				colorScheme='gray'
				onClick={() => {
					setRows([...rows, []])
				}}
			>
				+ row
			</Button>
			<Modal
				isOpen={newColModal.visible}
				onClose={() => setNewColModal({ ...newColModal, visible: false })}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						{t(newColModal.edit ? 'common.edit' : 'common.new')}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack>
							<Input
								placeholder={t('common.buttonUrl')}
								ref={buttonText}
								defaultValue={newColModal._text}
								autoFocus
							/>
							<Input
								placeholder={t('common.buttonUrl')}
								ref={buttonUrl}
								defaultValue={newColModal._url}
							/>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<ButtonGroup>
							<Button
								size='sm'
								leftIcon={<HiCheck />}
								onClick={() => {
									const btnName = buttonText.current?.value
									const btnUrl = buttonUrl.current?.value
									const _rows = [...rows]

									const { row = 0, edit } = newColModal

									if (edit) {
										const { _row = 0, _col = 0 } = newColModal

										_rows[_row][_col].text = buttonText.current?.value
										_rows[_row][_col].url = buttonUrl.current?.value

										// console.log('_rows', _rows)
									} else _rows[row].push({ text: btnName, url: btnUrl })

									setRows(_rows)
									setNewColModal({ visible: false })
									props.onChange(_rows)
								}}
							>
								{t(newColModal.edit ? 'common.update' : 'common.add')}
							</Button>
							{newColModal.edit && (
								<Button
									size='sm'
									leftIcon={<HiTrash />}
									colorScheme='red'
									onClick={() => {
										const { _row = 0, _col = 0 } = newColModal

										const _rows = [...rows]

										_rows[_row].splice(_col, 1)

										if (_rows[_row].length === 0) {
											_rows.splice(_row, 1)
										}

										setRows(_rows)
										setNewColModal({ visible: false })
									}}
								>
									{t('common.delete')}
								</Button>
							)}
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default ButtonBuilder
