export interface BaseModule {
	id: number
	name: string
}

export enum PokemonType {
	normal = 'normal',
	fighting = 'fighting',
	flying = 'flying',
	poison = 'poison',
	ground = 'ground',
	rock = 'rock',
	bug = 'bug',
	ghost = 'ghost',
	steel = 'steel',
	fire = 'fire',
	water = 'water',
	grass = 'grass',
	electric = 'electric',
	psychic = 'psychic',
	ice = 'ice',
	dragon = 'dragon',
	dark = 'dark',
	fairy = 'fairy',
	unknown = 'unknown',
	shadow = 'shadow',
}

export enum EvolutionDetail {
	minLevel = 'minLevel',
	minAffection = 'minAffection',
	minBeauty = 'minBeauty',
	minHappiness = 'minHappiness',
	gender = 'gender',
	item = 'item',
	heldItem = 'heldItem',
	knowMove = 'knowMove',
	knowMoveType = 'knowMoveType',
	location = 'location',
	needsOverworldRain = 'needsOverworldRain',
	turnUpsideDown = 'turnUpsideDown',
	partySpecies = 'partySpecies',
	partyType = 'partyType',
	relativePhysicalStats = 'relativePhysicalStats',
	timeOfDay = 'timeOfDay',
	tradeSpecies = 'tradeSpecies',
}

export enum EvolutionTrigger {
	levelUp = 'level-up',
	trade = 'trade',
	useItem = 'use-item',
	shed = 'shed',
	spin = 'spin',
	towerOfDarkness = 'tower-of-darkness',
	towerOfWaters = 'tower-of-waters',
	threeCriticalHits = 'three-critical-hits',
	takeDamage = 'take-damage',
	other = 'other',
}

export interface PokemonStat {
	name: string
	value: number
}

export interface PokemonEvolutionDetails {
	gender: string
	heldItem: any
	item: any
	knowMove: any
	knowMoveType: any
	location: any
	minAffection: number
	minBeauty: number
	minHappiness: number
	minLevel: number
	needsOverworldRain: boolean
	partySpecies: any
	partyType: any
	relativePhysicalStats: any
	timeOfDay: any
	tradeSpecies: any
	trigger: EvolutionTrigger
	turnUpsideDown: any
}

export interface PokemonEvolution {
	name: string
	evolutions: PokemonEvolution[]
	details: PokemonEvolutionDetails[]
}

export interface PokemonSpecies {
	baseHappiness: number
	captureRate: number
	eggGroups: BaseModule[]
	evolutionChainId: number
	flavorText: string
	genderRate: number
	genera: string
	generation: BaseModule
	growthRate: BaseModule
	habitat: BaseModule
	id: number
	shape: BaseModule
}

export interface SimplePokemon {
	name: string
}

export interface Pokemon {
	id: number
	name: string
	height: number
	weight: number
	abilities: string[]
	types: PokemonType[]
	sprite: string
	stats: PokemonStat[]
}
