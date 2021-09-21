import { Button } from '@chakra-ui/button'
import { UICard } from 'components/ui/card'
import { useHistory } from 'react-router'

const ListCommands: React.FC = () => {
	const history = useHistory()

	return (
		<UICard
			title='Commands'
			extras={
				<Button
					size='sm'
					onClick={() =>
						history.push(history.location.pathname + '/new-command')
					}
				>
					New
				</Button>
			}
		></UICard>
	)
}

export default ListCommands
