import classNames from 'classnames'
import { LegacyRef } from 'react'
import PokeballIcon from 'src/assets/svg/pokeball.svg'

interface PokemonLoaderProps {
	loading: boolean
	ref: LegacyRef<HTMLDivElement>
}

const PokemonLoader = (props: PokemonLoaderProps) => {
	const { loading, ref } = props
	return (
		<div ref={ref} className='flex items-center justify-center py-8'>
			<div className='flex space-x-4'>
				<img
					src={PokeballIcon}
					alt='pokeball-icon'
					className={classNames('w-8', 'h-8', {
						'animate-bounce': loading,
					})}
				/>
				<img
					src={PokeballIcon}
					alt='pokeball-icon'
					className={classNames('w-8', 'h-8', {
						'animate-bounce': loading,
						'animation-delay-300': loading,
					})}
				/>
				<img
					src={PokeballIcon}
					alt='pokeball-icon'
					className={classNames('w-8', 'h-8', {
						'animate-bounce': loading,
						'animation-delay-600': loading,
					})}
				/>
			</div>
		</div>
	)
}

export default PokemonLoader
