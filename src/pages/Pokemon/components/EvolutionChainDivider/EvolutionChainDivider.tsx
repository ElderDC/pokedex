import {
	EvolutionDetail,
	PokemonEvolutionDetails,
} from '@/models/pokemon.model'
import Avatar from '@/components/ui/atoms/Avatar'
import Divider from '@/components/ui/atoms/Divider'
import AvatarGroup from '@/components/ui/atoms/AvatarGroup'
import Tooltip from '@/components/ui/atoms/Tooltip'
import EvolutionChainTooltipContent from '@/pages/Pokemon/components/EvolutionChainTooltipContent'
import { getEvolutionDetailData, getEvolutionTriggerData } from '@/utilities'

interface EvolutionChainProps {
	details: PokemonEvolutionDetails[]
}

const EvolutionChainDivider = (props: EvolutionChainProps) => {
	const { details } = props

	return (
		<Divider horizontal>
			<div>
				<AvatarGroup vertical>
					{details.map((detail, index) => {
						const { trigger, ...restDetail } = detail
						const triggerData = getEvolutionTriggerData(trigger)
						const detailData = Object.entries(restDetail).map(
							([key, value]) => {
								const detailData = getEvolutionDetailData(
									key as EvolutionDetail
								)
								return { ...detailData, value }
							}
						)
						return (
							<Tooltip
								key={index}
								bottom
								content={
									<EvolutionChainTooltipContent
										trigger={triggerData}
										details={detailData}
									/>
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
