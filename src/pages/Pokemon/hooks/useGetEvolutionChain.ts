import { useEffect, useState } from 'react'
import {
	createEvolutionChainAdapter,
	createListEvolutionChainAdapter,
} from 'src/adapters/evolution.adapter'
import { createPokemonAdapter } from 'src/adapters/pokemon.adapter'
import { Pokemon, PokemonEvolution } from 'src/models/pokemon.model'
import { getEvolutionChain, getPokemon } from 'src/services/pokemon.service'

export function useGetEvolutionChain(
	payload: number | null
): [PokemonEvolution, Record<string, Pokemon>] {
	const [data, setData] = useState<PokemonEvolution>({} as PokemonEvolution)
	const [pokemons, setPokemons] = useState<Record<string, Pokemon>>({})

	useEffect(() => {
		payload && fetchEvolutionChain(payload)
	}, [payload])

	const fetchEvolutionChain = async (data: number) => {
		const responseEvolutionChain = await getEvolutionChain(data)

		const evolutionChainAdapted = createEvolutionChainAdapter(
			responseEvolutionChain.chain
		)
		const listEvolutionChainAdapted = createListEvolutionChainAdapter(
			responseEvolutionChain.chain
		)
		const evolutionPokemons = await Promise.all(
			listEvolutionChainAdapted.map(async (element) => {
				const pokemon = await getPokemon(element)
				const simplePokemon = createPokemonAdapter(pokemon)
				return simplePokemon
			})
		)
		const evolutionPokemonsObject = evolutionPokemons.reduce(
			(object, element) => ({ ...object, [element.name]: element }),
			{}
		)
		setData(evolutionChainAdapted)
		setPokemons(evolutionPokemonsObject)
	}

	return [data, pokemons]
}
