import {
	EvolutionDetail,
	EvolutionTrigger,
	PokemonEvolutionDetails,
} from 'src/models/pokemon.model'
import Avatar from 'src/components/ui/atoms/Avatar'
import Divider from 'src/components/ui/atoms/Divider'
import Text from 'src/components/ui/atoms/Text'
import AvatarGroup from 'src/components/ui/atoms/AvatarGroup'
import Tooltip from 'src/components/ui/atoms/Tooltip'
import { ReactComponent as PokeballIcon } from 'src/assets/svg/pokeball.svg'
import { ReactComponent as CriticalHitIcon } from 'src/assets/svg/EvolutionTrigger/critical-hit.svg'
import { ReactComponent as LevelUpIcon } from 'src/assets/svg/EvolutionTrigger/level-up.svg'
import { ReactComponent as TradeIcon } from 'src/assets/svg/EvolutionTrigger/trade.svg'
import { ReactComponent as UseItemIcon } from 'src/assets/svg/EvolutionTrigger/use-item.svg'
import { ReactComponent as TakeDamageIcon } from 'src/assets/svg/EvolutionTrigger/take-damage.svg'
import { ReactComponent as TowerIcon } from 'src/assets/svg/EvolutionTrigger/tower.svg'

interface EvolutionChainProps {
	details: PokemonEvolutionDetails[]
}

const EvolutionChainDivider = (props: EvolutionChainProps) => {
	const { details } = props

	const getEvolutionTriggerData = (trigger: EvolutionTrigger) => {
		const triggerOptions = {
			'level-up': {
				title: 'Level up',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
				icon: LevelUpIcon,
			},
			trade: {
				title: 'Trade',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
				icon: TradeIcon,
			},
			'use-item': {
				title: 'Use item',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
				icon: UseItemIcon,
			},
			shed: {
				title: 'Shed',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
				icon: PokeballIcon,
			},
			spin: {
				title: 'Spin',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
				icon: PokeballIcon,
			},
			'tower-of-darkness': {
				title: 'Tower of darkness',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
				icon: TowerIcon,
			},
			'tower-of-waters': {
				title: 'Tower of waters',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
				icon: TowerIcon,
			},
			'three-critical-hits': {
				title: 'Three critical hits',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
				icon: CriticalHitIcon,
			},
			'take-damage': {
				title: 'Take damage',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
				icon: TakeDamageIcon,
			},
			other: {
				title: 'Other',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
				icon: PokeballIcon,
			},
		}
		return triggerOptions[trigger]
	}

	const getEvolutionDetailData = (detail: EvolutionDetail) => {
		const detailOptions = {
			minLevel: {
				title: 'Min level',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			minAffection: {
				title: 'Min affection',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			minBeauty: {
				title: 'Min beauty',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			minHappiness: {
				title: 'Min happiness',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			gender: {
				title: 'Gender',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			item: {
				title: 'Item',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			heldItem: {
				title: 'Held item',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			knowMove: {
				title: 'Know move',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			knowMoveType: {
				title: 'Know move type',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			location: {
				title: 'Location',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			needsOverworldRain: {
				title: 'Needs overworld rain',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			turnUpsideDown: {
				title: 'Turn upside down',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			partySpecies: {
				title: 'Party species',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			partyType: {
				title: 'Party type',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			relativePhysicalStats: {
				title: 'Relative physical stats',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			timeOfDay: {
				title: 'Time of day',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
			tradeSpecies: {
				title: 'Trade species',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam distinctio.',
			},
		}
		return detailOptions[detail]
	}

	return (
		<Divider horizontal>
			<div>
				<AvatarGroup vertical>
					{details.map((detail, index) => {
						const { trigger, ...restDetail } = detail
						const triggerData = getEvolutionTriggerData(trigger)
						return (
							<Tooltip
								key={index}
								bottom
								content={
									<div className='space-y-2'>
										<div>
											<Text>{triggerData.title}</Text>
										</div>
										<div className='w-52'>
											<Text>{triggerData.description}</Text>
										</div>
										{Object.entries(restDetail).map(([key, value]) => {
											const detailData = getEvolutionDetailData(
												key as EvolutionDetail
											)
											if (value) {
												return (
													<>
														<div>
															<Text>
																{detailData.title}: {JSON.stringify(value)}
															</Text>
														</div>
														<div className='w-52'>
															<Text>{detailData.description}</Text>
														</div>
													</>
												)
											}
											return ''
										})}
									</div>
								}
							>
								<Avatar
									bgColor='bg-amber-500'
									width='w-16'
									rounded
									className='p-3'
								>
									<triggerData.icon className='fill-black/50' />
								</Avatar>
							</Tooltip>
						)
					})}
				</AvatarGroup>
			</div>
		</Divider>
	)
}

export default EvolutionChainDivider
