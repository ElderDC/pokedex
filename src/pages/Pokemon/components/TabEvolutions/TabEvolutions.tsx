import {
	Pokemon,
	PokemonEvolution,
	PokemonEvolutionDetails,
} from 'src/models/pokemon.model'
import TabPanel from 'src/components/ui/atoms/TabPanel'
import Text from 'src/components/ui/atoms/Text'
import EvolutionChainItem from 'src/pages/Pokemon/components/EvolutionChainItem'

interface TabEvolutionsProps {
	value: number | string
	evolution: PokemonEvolution
	pokemons: Record<string, Pokemon>
}

type EvolutionChain = {
	pokemonFrom: Pokemon
	pokemonTo: Pokemon
	details: PokemonEvolutionDetails[]
}

const formatEvolutionChain = (
	data: PokemonEvolution,
	pokemons: Record<string, Pokemon>,
	newArray: EvolutionChain[] = []
) => {
	const { name, evolutions = [] } = data

	const pokemonFrom = pokemons[name]

	evolutions.forEach((item) => {
		const pokemonTo = pokemons[item.name]

		newArray.push({
			pokemonFrom,
			pokemonTo,
			details: item.details,
		})

		if (item.evolutions.length) {
			formatEvolutionChain(item, pokemons, newArray)
		}
	})

	return newArray
}

const TabEvolutions = (props: TabEvolutionsProps) => {
	const { value, evolution, pokemons } = props

	const formatedEvolutionChain = formatEvolutionChain(evolution, pokemons)

	return (
		<TabPanel value={value} className='p-8'>
			<div className='mb-8'>
				<Text size='subtitle1' weight='bold'>
					Evolution chain
				</Text>
			</div>
			<div className='space-y-12'>
				{formatedEvolutionChain.length < 1 && (
					<Text>No se encontraron evoluciones</Text>
				)}
				{formatedEvolutionChain.map(
					({ pokemonFrom, pokemonTo, details }, index) => (
						<EvolutionChainItem
							key={index}
							pokemonFrom={pokemonFrom}
							pokemonTo={pokemonTo}
							details={details}
						/>
					)
				)}
			</div>
		</TabPanel>
	)
}

export default TabEvolutions
