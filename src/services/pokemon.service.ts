import { PokemonClient, EvolutionClient } from 'pokenode-ts'

export const listPokemons = (offset: number, limit: number) => {
	const api = new PokemonClient()
	return api.listPokemons(offset, limit)
}

export const getPokemon = (payload: string) => {
	const api = new PokemonClient()
	return api.getPokemonByName(payload)
}

export const getPokemonSpecies = (payload: string) => {
	const api = new PokemonClient()
	return api.getPokemonSpeciesByName(payload)
}

export const getEvolutionChain = (payload: number) => {
	const api = new EvolutionClient()
	return api.getEvolutionChainById(payload)
}
