import { PokemonClient, EvolutionClient } from 'pokenode-ts'

const pokemonClient = new PokemonClient()
const evolutionClient = new EvolutionClient()

export const listPokemons = (offset: number, limit: number) => {
	return pokemonClient.listPokemons(offset, limit)
}

export const getPokemon = (payload: string) => {
	return pokemonClient.getPokemonByName(payload)
}

export const getPokemonSpecies = (payload: string) => {
	return pokemonClient.getPokemonSpeciesByName(payload)
}

export const getEvolutionChain = (payload: number) => {
	return evolutionClient.getEvolutionChainById(payload)
}
