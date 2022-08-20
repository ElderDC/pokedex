import { Pokemon } from '@/models/pokemon.model'
import { ReactComponent as PokeballIcon } from '@/assets/svg/pokeball.svg'
import Text from '@/components/ui/atoms/Text'
import { Link } from 'react-router-dom'
import { PublicRoutes } from '@/models/routes.model'
import { replaceRouteParams } from '@/utilities'

interface EvolutionChainCardProps {
	pokemon: Pokemon
}

const EvolutionChainCard = (props: EvolutionChainCardProps) => {
	const { pokemon } = props

	const link = replaceRouteParams(PublicRoutes.POKEMON, {
		pokemon: pokemon.name,
	})

	return (
		<div className='grid w-1/2 h-48 flex-grow place-items-center'>
			<Link to={link}>
				<div className='relative'>
					<figure className='absolute pointer-events-none z-0'>
						<PokeballIcon className='w-40 h-40 fill-gray-300' />
					</figure>
					<figure className='relative p-4 z-10'>
						<img
							src={pokemon.sprite || ''}
							alt={pokemon.name}
							className='w-32 h-32'
						/>
					</figure>
				</div>
				<Text
					weight='bold'
					transform='capitalize'
					size='subtitle2'
					className='z-10'
				>
					{pokemon.name}
				</Text>
			</Link>
		</div>
	)
}

export default EvolutionChainCard
