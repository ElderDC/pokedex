import { SimplePokemon, Pokemon } from 'src/models/pokemon.model'

export const createSimplePokemonAdapter = (data: any): SimplePokemon => {
	return {
		name: data?.name,
	}
}

export const createListSimplePokemonAdapter = (
	data: any[]
): SimplePokemon[] => {
	return data.map(createSimplePokemonAdapter)
}

export const createPokemonAdapter = (data: any): Pokemon => {
	const abilities = data?.abilities?.map(({ ability }: any) => ability.name)
	const types = data?.types?.map(({ type }: any) => type.name)
	const stats = data?.stats?.map(({ stat, base_stat: value }: any) => ({
		name: stat.name,
		value,
	}))
	const sprite =
		data.sprites?.other?.dream_world?.front_default ||
		data.sprites?.other?.['official-artwork']?.front_default

	return {
		id: data.id,
		name: data.name,
		height: data.height,
		weight: data.weight,
		abilities,
		types,
		sprite,
		stats,
	}
}

export const createListPokemonAdapter = (data: any[]): Pokemon[] => {
	return data.map(createPokemonAdapter)
}
