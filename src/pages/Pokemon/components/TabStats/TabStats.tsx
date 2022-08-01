import { Pokemon } from 'src/models/pokemon.model'
import TabPanel from 'src/components/ui/atoms/TabPanel'
import Text from 'src/components/ui/atoms/Text'
import { getColorStat } from 'src/utilities'
import Progress from 'src/components/ui/atoms/Progress'
import { useEffect, useState } from 'react'

type TabStatsProps = {
	value: number | string
	pokemon: Pokemon
}

const TabStats = (props: TabStatsProps) => {
	const { value, pokemon } = props

	const [totalStats, setTotalStats] = useState<number>(0)
	const [totalValueStats, setTotalValueStats] = useState<number>(0)

	useEffect(() => {
		const totalasdStats = pokemon?.stats?.reduce(
			(accumulator, item) => accumulator + item.value,
			0
		)
		setTotalStats(pokemon?.stats?.length || 0)
		setTotalValueStats(totalasdStats)
	}, [pokemon])

	return (
		<TabPanel value={value} className='p-8 space-y-4'>
			{pokemon.stats.map((stat) => (
				<div key={stat.name} className='grid gap-4 grid-cols-3'>
					<Text weight='medium' transform='capitalize'>
						{stat.name}
					</Text>
					<div className='col-span-2 flex items-center'>
						<Text className='w-10 mr-4' align='right' weight='medium'>
							{stat.value}
						</Text>
						<Progress
							value={stat.value}
							color={getColorStat(stat.value, 100)}
							rounded
						></Progress>
					</div>
				</div>
			))}
			<div className='grid gap-4 grid-cols-3'>
				<Text weight='medium' transform='capitalize'>
					Total
				</Text>
				<div className='col-span-2 flex items-center'>
					<Text className='w-10 mr-4' align='right' weight='medium'>
						{totalValueStats}
					</Text>
					<Progress
						value={totalValueStats}
						max={totalStats * 100}
						color={getColorStat(totalValueStats, totalStats * 100)}
						rounded
					></Progress>
				</div>
			</div>
		</TabPanel>
	)
}

export default TabStats
