import { useEffect, useState } from 'react'
import { PokemonStat } from '@/models/pokemon.model'
import TabPanel from '@/components/ui/atoms/TabPanel'
import StatItem from '@/pages/Pokemon/components/StatItem'

interface TabStatsProps {
	value: number | string
	stats: PokemonStat[]
}

const TabStats = (props: TabStatsProps) => {
	const { value, stats = [] } = props

	const [totalStats, setTotalStats] = useState<number>(0)
	const [totalValueStats, setTotalValueStats] = useState<number>(0)

	useEffect(() => {
		const totalValue = stats.reduce((acc, { value }) => acc + value, 0)
		setTotalStats(stats.length || 0)
		setTotalValueStats(totalValue)
	}, [stats])

	return (
		<TabPanel value={value} className='p-8 space-y-4'>
			{stats.map(({ name, value }) => (
				<StatItem key={name} name={name} value={value} />
			))}
			<StatItem name='Total' max={totalStats * 100} value={totalValueStats} />
		</TabPanel>
	)
}

export default TabStats
