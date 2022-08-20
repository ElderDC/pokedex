import { ReactComponent as PokeballIcon } from '@/assets/svg/pokeball.svg'
import { ReactComponent as CriticalHitIcon } from '@/assets/svg/EvolutionTrigger/critical-hit.svg'
import { ReactComponent as LevelUpIcon } from '@/assets/svg/EvolutionTrigger/level-up.svg'
import { ReactComponent as TradeIcon } from '@/assets/svg/EvolutionTrigger/trade.svg'
import { ReactComponent as UseItemIcon } from '@/assets/svg/EvolutionTrigger/use-item.svg'
import { ReactComponent as TakeDamageIcon } from '@/assets/svg/EvolutionTrigger/take-damage.svg'
import { ReactComponent as TowerIcon } from '@/assets/svg/EvolutionTrigger/tower.svg'
import { EvolutionTrigger } from '@/models/pokemon.model'

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
