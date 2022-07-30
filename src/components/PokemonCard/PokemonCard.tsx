import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Pokemon } from 'src/models/pokemon.model'
import { getPokemon } from 'src/services/pokemon.service'
import { createPokemonAdapter } from 'src/adapters/pokemon.adapter'
import { getPokemonIdFormated, getPokemonTypeBackground } from 'src/utilities'
import { ReactComponent as PokeballIcon } from 'src/assets/svg/pokeball.svg'
import Babge from 'src/components/ui/atoms/Babge'
import Card from 'src/components/ui/atoms/Card'
import CardBody from 'src/components/ui/atoms/CardBody'
import Ripple from 'src/components/ui/atoms/Ripple'
import Text from 'src/components/ui/atoms/Text'
import Tooltip from 'src/components/ui/atoms/Tooltip'

interface PokemonCardProps {
	pokemon: string
}

const PokemonCard = (props: PokemonCardProps) => {
	const { pokemon } = props
	const [isLoading, setIsLoading] = useState(true)
	const [pokemonData, setPokemonData] = useState<Pokemon>({} as Pokemon)

	const fetchPokemon = async () => {
		try {
			setIsLoading(true)
			const response = await getPokemon(pokemon)
			const pokemonAdapted = createPokemonAdapter(response)
			setPokemonData(pokemonAdapted)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchPokemon()
	}, [pokemon])

	if (isLoading) {
		return (
			<div className='card w-full shadow-xl bg-slate-500'>
				<div className='mt-6 flex items-center justify-center animate-pulse'>
					<div className='w-40 h-40 p-4 z-10 bg-slate-400 rounded-lg' />
				</div>
				<div className='card-body items-center text-center animate-pulse'>
					<div className='h-6 w-24 bg-slate-400 rounded-xl'></div>
					<div className='grid grid-cols-2 gap-2'>
						<div className='h-6 w-16 bg-slate-400 rounded-xl col-span-1'></div>
						<div className='h-6 w-16 bg-slate-400 rounded-xl col-span-1'></div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<Link to={`/pokemon/${pokemon}`}>
			<motion.div whileHover={{ scale: 1.1, zIndex: 10 }}>
				<Card
					className='cursor-pointer text-white'
					bgColor={getPokemonTypeBackground(pokemonData.types?.[0])}
					shadow
				>
					<Text
						className='absolute top-4 right-4 text-white/70'
						size='subtitle2'
						weight='extrabold'
					>
						#{getPokemonIdFormated(pokemonData.id)}
					</Text>
					<figure className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
						<PokeballIcon className='w-48 h-48 fill-white' />
					</figure>
					<div className='mt-6 flex items-center justify-center'>
						<figure>
							<img
								src={pokemonData.sprite || ''}
								alt={pokemonData.name}
								className='w-40 h-40 p-4 z-10'
							/>
						</figure>
					</div>
					<CardBody className='items-center text-center'>
						<Text
							className='text-white'
							size='h6'
							weight='bold'
							transform='capitalize'
						>
							{pokemonData.name}
						</Text>
						<div className='flex gap-1'>
							{pokemonData.types?.map((type) => (
								<Babge key={type} size='lg' className='bg-white/30 text-white'>
									{type}
								</Babge>
							))}
						</div>
					</CardBody>
					<Ripple />
				</Card>
			</motion.div>
		</Link>
	)
}

export default PokemonCard
