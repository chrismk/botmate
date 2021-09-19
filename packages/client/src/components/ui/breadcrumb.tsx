import { Breadcrumb, BreadcrumbItem, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface Step {
	name: string
	link: string
}

interface UIBreadcrumbProps {
	steps: Step[]
	state?: any
}

const UIBreadcrumb: React.FC<UIBreadcrumbProps> = (props) => {
	const { steps, state } = props

	return (
		<Breadcrumb>
			{steps.map((step, idx) => (
				<BreadcrumbItem key={idx}>
					{step.link ? (
						<Link to={{ pathname: step.link, state }}>{step.name}</Link>
					) : (
						<Text>{step.name}</Text>
					)}
				</BreadcrumbItem>
			))}
		</Breadcrumb>
	)
}

export default UIBreadcrumb
