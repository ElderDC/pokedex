import Progress from '@/components/ui/atoms/Progress'
import Text from '@/components/ui/atoms/Text'
import { getColorStat } from '@/utilities'

interface StatItemProps {
	max?: number
	name: string
	value: number
}

const StatItem = (props: StatItemProps) => {
	const { name, max = 100, value } = props
	return (
		<div key={name} className='grid gap-4 grid-cols-3'>
			<Text weight='medium' transform='capitalize'>
				{name}
			</Text>
			<div className='col-span-2 flex items-center'>
				<Text className='w-10 mr-4' align='right' weight='medium'>
					{value}
				</Text>
				<Progress
					value={value}
					color={getColorStat(value, max)}
					rounded
					max={max}
				></Progress>
			</div>
		</div>
	)
}

export default StatItem
