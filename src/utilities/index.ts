import { PokemonType } from 'src/models/pokemon.model'

export const delay = (ms = 0): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

export const ruleOfThree = (value: number, total: number): number => {
	return (value * 100) / total
}

export const joinDataToSearch = (...fields: string[]): string => {
	return fields.join('').trim().replace(' ', '').toLocaleLowerCase()
}

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

export const getPokemonIdFormated = (id: number): string => {
	return id.toString().padStart(4, '0')
}

export const getPathnameArrayFromUrl = (url: string): string[] => {
	const urlEntity = new URL(url)
	const { pathname } = urlEntity
	const pathnameArray = pathname.split('/').filter((item) => item !== '')
	return pathnameArray
}

export const createWrapperAndAppendToBody = (
	wrapperId: string
): HTMLElement => {
	const wrapperElement = document.createElement('div')
	wrapperElement.setAttribute('id', wrapperId)
	document.body.appendChild(wrapperElement)
	return wrapperElement
}
