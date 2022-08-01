import { PokemonSpecies } from 'src/models/pokemon.model'
import { getPathnameArrayFromUrl } from 'src/utilities'

export const createSpeciesAdapter = (data: any = {}): PokemonSpecies => {
	const evolutionChainIdString = getPathnameArrayFromUrl(
		data.evolution_chain?.url
	)[3]
	const eggGroups = data.egg_group?.map((item: any) => ({
		id: Number(getPathnameArrayFromUrl(item.url)[3]),
		name: item.name,
	}))
	const flavorText = data.flavor_text_entries?.find(
		(item: any) => item?.language?.name === 'en'
	)
	const genera = data.genera?.find((item: any) => item?.language?.name === 'en')
	const generation = {
		id: Number(getPathnameArrayFromUrl(data.generation.url)[3]),
		name: data.generation.name,
	}
	const growthRate = {
		id: Number(getPathnameArrayFromUrl(data.growth_rate.url)[3]),
		name: data.growth_rate.name,
	}
	const habitat = {
		id: Number(getPathnameArrayFromUrl(data.habitat.url)[3]),
		name: data.habitat.name,
	}
	const shape = {
		id: Number(getPathnameArrayFromUrl(data.shape.url)[3]),
		name: data.shape.name,
	}

	return {
		baseHappiness: data.base_happines,
		captureRate: data.capture_rate,
		eggGroups,
		evolutionChainId: Number(evolutionChainIdString),
		flavorText:
			flavorText?.flavor_text?.replaceAll('\n', ' ').replaceAll('\f', ' ') ||
			null,
		genderRate: data.gender_rate,
		genera: genera?.genus || null,
		generation,
		growthRate,
		habitat,
		id: data.id,
		shape,
	}
}
