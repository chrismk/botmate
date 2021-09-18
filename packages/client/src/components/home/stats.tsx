import { Box, Heading } from '@chakra-ui/layout'
import { IconType } from 'react-icons'
import { HiMail } from 'react-icons/hi'

interface StatItemProps {
	title: string
	icon: IconType
}

const Stats = () => {
	const StatItem: React.FC<StatItemProps> = ({ title, icon }) => (
		<Box textColor='gray.500'>
			<Heading fontSize='md'>{title}</Heading>
		</Box>
	)

	return (
		<Box>
			<StatItem title='Total Bots' icon={HiMail} />
		</Box>
	)
}
export default Stats
