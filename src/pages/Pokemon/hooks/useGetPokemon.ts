import { useEffect, useState } from 'react'
import { createPokemonAdapter } from 'src/adapters/pokemon.adapter'
import { Pokemon } from 'src/models/pokemon.model'
import { getPokemon } from 'src/services/pokemon.service'

export function useGetPokemon(pokemon: string): [Pokemon, boolean, boolean] {
	const [hasError, setHasError] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [pokemonData, setPokemonData] = useState<Pokemon>({} as Pokemon)

	useEffect(() => {
		getPokemon(pokemon)
			.then((data) => createPokemonAdapter(data))
			.then((data) => setPokemonData(data))
			.catch(() => setHasError(true))
			.finally(() => setIsLoading(false))
	}, [pokemon])

	return [pokemonData, isLoading, hasError]
}
