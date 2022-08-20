import { Pokemon, PokemonSpecies } from '@/models/pokemon.model'
import TabPanel from '@/components/ui/atoms/TabPanel'
import Text from '@/components/ui/atoms/Text'

type TabAboutProps = {
	value: number | string
	species: PokemonSpecies
	pokemon: Pokemon
}

const TabAbout = (props: TabAboutProps) => {
	const { value, species, pokemon } = props
	return (
		<TabPanel value={value} className='p-8 space-y-4'>
			<div>
				<Text>{species.flavorText}</Text>
			</div>
			<div className='grid gap-4 grid-cols-3'>
				<Text weight='medium'>Species</Text>
				<Text className='col-span-2' weight='medium'>
					{species.genera}
				</Text>
			</div>
			<div className='grid gap-4 grid-cols-3'>
				<Text weight='medium'>Height</Text>
				<Text className='col-span-2' weight='medium'>
					{(pokemon.height * 0.1).toFixed(2)} m
				</Text>
			</div>
			<div className='grid gap-4 grid-cols-3'>
				<Text weight='medium'>Weight</Text>
				<Text className='col-span-2' weight='medium'>
					{(pokemon.weight * 0.1).toFixed(2)} kg
				</Text>
			</div>
			<div className='grid gap-4 grid-cols-3'>
				<Text weight='medium'>Abilities</Text>
				<Text className='col-span-2' weight='medium'>
					{pokemon.abilities.join(', ')}
				</Text>
			</div>
		</TabPanel>
	)
}

export default TabAbout
