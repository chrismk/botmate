import {
	Text,
	Stack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Spacer,
	Box,
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { botsAtom } from 'atom'
import { useTranslation } from 'react-i18next'

interface Props {
	onSelect: (id: number) => void
}

const useBotPicker = () => {
	const { t } = useTranslation()
	const [bots] = useRecoilState(botsAtom)
	const modal = useDisclosure()

	const Picker: React.FC<Props> = ({ onSelect }) => {
		return (
			<Modal isOpen={modal.isOpen} onClose={modal.onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('common.pickBot')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody maxH='44' overflow='auto'>
						<Stack>
							{bots.map((bot, idx) => (
								<Box
									key={idx}
									d='flex'
									alignItems='center'
									onClick={() => {
										onSelect(bot.id)
										modal.onClose()
									}}
									rounded='lg'
									py={1}
									px={2}
									size='md'
									cursor='pointer'
									_hover={{ bg: 'brand.100' }}
								>
									<Text>{bot.name}</Text>
									<Spacer />
									<Text>{bot.id}</Text>
								</Box>
							))}
						</Stack>
					</ModalBody>

					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		)
	}
	return {
		Picker,
		botPicker: modal,
	}
}

export { useBotPicker }
