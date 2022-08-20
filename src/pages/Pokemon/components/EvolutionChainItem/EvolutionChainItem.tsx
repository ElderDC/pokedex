import { Pokemon, PokemonEvolutionDetails } from '@/models/pokemon.model'
import EvolutionChainCard from '@/pages/Pokemon/components/EvolutionChainCard'
import EvolutionChainDivider from '@/pages/Pokemon/components/EvolutionChainDivider'

interface EvolutionChainProps {
	pokemonFrom: Pokemon
	pokemonTo: Pokemon
	details: PokemonEvolutionDetails[]
}

const EvolutionChainItem = (props: EvolutionChainProps) => {
	const { pokemonFrom, pokemonTo, details } = props

	return (
		<div className='flex w-full'>
			<EvolutionChainCard pokemon={pokemonFrom} />
			<EvolutionChainDivider details={details} />
			<EvolutionChainCard pokemon={pokemonTo} />
		</div>
	)
}

export default EvolutionChainItem
