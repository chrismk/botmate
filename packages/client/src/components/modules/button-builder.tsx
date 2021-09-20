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
} from '@chakra-ui/react'

type Buttons = any[][]

interface Props {
	onChange: (buttons: Buttons) => void
	defValue: any
}

const ButtonBuilder: React.FC<Props> = (props) => {
	const buttonName = useRef<HTMLInputElement>(null)
	const buttonUrl = useRef<HTMLInputElement>(null)

	const [newColModal, setNewColModal] = useState({
		row: 0,
		visible: false,
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
									<Button mr={2} size='xs' colorScheme='gray' key={cidx}>
										{col.name}
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
					<ModalHeader>New Button</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack>
							<Input placeholder='Button Name' ref={buttonName} autoFocus />
							<Input placeholder='Button URL' ref={buttonUrl} />
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button
							onClick={() => {
								const btnName = buttonName.current?.value
								const btnUrl = buttonUrl.current?.value
								const _rows = rows
								_rows[newColModal.row].push({ name: btnName, url: btnUrl })
								setRows(_rows)
								setNewColModal({ ...newColModal, visible: false })
								props.onChange(_rows)
							}}
						>
							Add
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default ButtonBuilder
