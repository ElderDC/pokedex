import { EvolutionDetail } from 'src/models/pokemon.model'

export const getEvolutionDetailData = (detail: EvolutionDetail) => {
	const detailOptions = {
		minLevel: {
			title: 'Min level',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		minAffection: {
			title: 'Min affection',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		minBeauty: {
			title: 'Min beauty',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		minHappiness: {
			title: 'Min happiness',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		gender: {
			title: 'Gender',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		item: {
			title: 'Item',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		heldItem: {
			title: 'Held item',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		knowMove: {
			title: 'Know move',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		knowMoveType: {
			title: 'Know move type',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		location: {
			title: 'Location',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		needsOverworldRain: {
			title: 'Needs overworld rain',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		turnUpsideDown: {
			title: 'Turn upside down',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		partySpecies: {
			title: 'Party species',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		partyType: {
			title: 'Party type',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		relativePhysicalStats: {
			title: 'Relative physical stats',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		timeOfDay: {
			title: 'Time of day',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		tradeSpecies: {
			title: 'Trade species',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
	}
	return detailOptions[detail]
}
