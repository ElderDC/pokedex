import { PokemonType } from '@/models/pokemon.model'

export const getPokemonTypeBackground = (type: PokemonType): string => {
	const typeOptions: Record<PokemonType, string> = {
		bug: 'bg-bug',
		dark: 'bg-dark',
		dragon: 'bg-dragon',
		electric: 'bg-electric',
		fairy: 'bg-fairy',
		fighting: 'bg-fighting',
		fire: 'bg-fire',
		flying: 'bg-flying',
		ghost: 'bg-ghost',
		grass: 'bg-grass',
		ground: 'bg-ground',
		ice: 'bg-ice',
		normal: 'bg-normal',
		poison: 'bg-poison',
		psychic: 'bg-psychic',
		rock: 'bg-rock',
		steel: 'bg-steel',
		unknown: 'bg-unknown',
		water: 'bg-water',
		shadow: 'bg-shadow',
	}

	return typeOptions[type]
}
