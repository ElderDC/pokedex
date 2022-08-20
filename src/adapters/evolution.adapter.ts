import { PokemonEvolution } from '@/models/pokemon.model'

export const createEvolutionChainAdapter = (data: any): PokemonEvolution => {
	const { species, evolves_to: evolves, evolution_details: details } = data
	const evolutions = evolves.map((element: any) =>
		createEvolutionChainAdapter(element)
	)
	const currentEvolution: PokemonEvolution = {
		name: species.name,
		evolutions,
		details: details.map((element: any) => ({
			gender: element.gender,
			heldItem: element.held_item,
			item: element.item,
			knowMove: element.know_move,
			knowMoveType: element.know_move_type,
			location: element.location,
			minAffection: element.min_affection,
			minBeauty: element.min_beauty,
			minHappiness: element.min_happiness,
			minLevel: element.min_level,
			needsOverworldRain: element.needs_overworld_rain,
			partySpecies: element.party_species,
			partyType: element.party_type,
			relativePhysicalStats: element.relative_physical_stats,
			timeOfDay: element.time_of_day,
			tradeSpecies: element.trade_species,
			trigger: element.trigger.name,
			turnUpsideDown: element.turn_upside_down,
		})),
	}

	return currentEvolution
}

export const createListEvolutionChainAdapter = (
	data: any,
	newChain?: any[]
): string[] => {
	const { species, evolves_to: evolves } = data

	const evolutionChain: string[] = newChain || []
	evolutionChain.push(species.name)
	evolves.map((element: any) =>
		createListEvolutionChainAdapter(element, evolutionChain)
	)

	return evolutionChain
}
