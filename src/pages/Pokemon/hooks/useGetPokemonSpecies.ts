import { useEffect, useState } from 'react'
import { PokemonSpecies } from 'src/models/pokemon.model'
import { getPokemonSpecies } from 'src/services/pokemon.service'
import { createSpeciesAdapter } from 'src/adapters/species.adapter'

export function useGetPokemonSpecies(pokemonName: string): [PokemonSpecies] {
	const [data, setData] = useState<PokemonSpecies>({} as PokemonSpecies)

	useEffect(() => {
		getPokemonSpecies(pokemonName)
			.then((data) => createSpeciesAdapter(data))
			.then((data) => setData(data))
			.catch((error) => console.log(error))
	}, [pokemonName])

	return [data]
}
