import { Pokemon, PokemonEvolutionDetails } from 'src/models/pokemon.model'
import EvolutionChainCard from '../EvolutionChainCard'
import EvolutionChainDivider from '../EvolutionChainDivider'

interface EvolutionChainProps {
	pokemonFrom: Pokemon
	pokemonTo: Pokemon
	details: PokemonEvolutionDetails[]
}

const EvolutionChain = (props: EvolutionChainProps) => {
	const { pokemonFrom, pokemonTo, details } = props

	return (
		<div className='flex w-full'>
			<EvolutionChainCard pokemon={pokemonFrom} />
			<EvolutionChainDivider details={details} />
			<EvolutionChainCard pokemon={pokemonTo} />
		</div>
	)
}

export default EvolutionChain
