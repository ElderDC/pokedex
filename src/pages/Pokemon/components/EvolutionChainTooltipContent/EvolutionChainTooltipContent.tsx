import Text from '@/components/ui/atoms/Text'

type EvolutionChainTooltipContentProps = {
	trigger: {
		title: string
		description: string
	}
	details: {
		title: string
		description: string
		value: string
	}[]
}

const EvolutionChainTooltipContent = (
	props: EvolutionChainTooltipContentProps
) => {
	const { trigger, details } = props

	return (
		<div className='space-y-2 w-52'>
			<div>
				<Text>{trigger.title}</Text>
			</div>
			<div>
				<Text>{trigger.description}</Text>
			</div>
			{details
				.filter((item) => item.value)
				.map((item) => (
					<>
						<div>
							<Text>
								{item.title}: {JSON.stringify(item.value)}
							</Text>
						</div>
						<div>
							<Text>{item.description}</Text>
						</div>
					</>
				))}
		</div>
	)
}

export default EvolutionChainTooltipContent
