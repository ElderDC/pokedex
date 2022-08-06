import { ReactComponent as PokeballIcon } from 'src/assets/svg/pokeball.svg'
import { ReactComponent as CriticalHitIcon } from 'src/assets/svg/EvolutionTrigger/critical-hit.svg'
import { ReactComponent as LevelUpIcon } from 'src/assets/svg/EvolutionTrigger/level-up.svg'
import { ReactComponent as TradeIcon } from 'src/assets/svg/EvolutionTrigger/trade.svg'
import { ReactComponent as UseItemIcon } from 'src/assets/svg/EvolutionTrigger/use-item.svg'
import { ReactComponent as TakeDamageIcon } from 'src/assets/svg/EvolutionTrigger/take-damage.svg'
import { ReactComponent as TowerIcon } from 'src/assets/svg/EvolutionTrigger/tower.svg'
import { EvolutionTrigger } from 'src/models/pokemon.model'

export const getEvolutionTriggerData = (trigger: EvolutionTrigger) => {
	const triggerOptions = {
		'level-up': {
			title: 'Level up',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: LevelUpIcon,
		},
		trade: {
			title: 'Trade',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: TradeIcon,
		},
		'use-item': {
			title: 'Use item',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: UseItemIcon,
		},
		shed: {
			title: 'Shed',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: PokeballIcon,
		},
		spin: {
			title: 'Spin',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: PokeballIcon,
		},
		'tower-of-darkness': {
			title: 'Tower of darkness',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: TowerIcon,
		},
		'tower-of-waters': {
			title: 'Tower of waters',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: TowerIcon,
		},
		'three-critical-hits': {
			title: 'Three critical hits',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: CriticalHitIcon,
		},
		'take-damage': {
			title: 'Take damage',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: TakeDamageIcon,
		},
		other: {
			title: 'Other',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: PokeballIcon,
		},
	}
	return triggerOptions[trigger]
}
