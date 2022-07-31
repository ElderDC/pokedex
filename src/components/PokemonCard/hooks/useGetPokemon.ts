import { useEffect, useState } from 'react'
import { createPokemonAdapter } from 'src/adapters/pokemon.adapter'
import { Pokemon } from 'src/models/pokemon.model'
import { getPokemon } from 'src/services/pokemon.service'

export function useGetPokemon(pokemon: string): [Pokemon, boolean] {
	const [isLoading, setIsLoading] = useState(true)
	const [pokemonData, setPokemonData] = useState<Pokemon>({} as Pokemon)

	useEffect(() => {
		getPokemon(pokemon)
			.then((data) => createPokemonAdapter(data))
			.then((data) => setPokemonData(data))
			.finally(() => setIsLoading(false))
	}, [pokemon])

	return [pokemonData, isLoading]
}
