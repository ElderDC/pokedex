import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ReactComponent as PokeballIcon } from 'src/assets/svg/pokeball.svg'
import { FaArrowLeft } from 'react-icons/fa'
import classNames from 'classnames'
import Text from 'src/components/ui/atoms/Text'
import Babge from 'src/components/ui/atoms/Babge'
import Button from 'src/components/ui/atoms/Button'
import AnimatePage from 'src/components/AnimatePage'
import Tabs from 'src/components/ui/molecules/Tabs'
import Tab from 'src/components/ui/atoms/Tab'
import TabPanels from 'src/components/ui/molecules/TabPanels'
import { useGetPokemonSpecies } from './hooks/useGetPokemonSpecies'
import { useGetPokemon } from 'src/pages/Pokemon/hooks/useGetPokemon'
import { useGetEvolutionChain } from 'src/pages/Pokemon/hooks/useGetEvolutionChain'
import TabAbout from 'src/pages/Pokemon/components/TabAbout'
import TabStats from 'src/pages/Pokemon/components/TabStats'
import TabEvolutions from './components/TabEvolutions'
import { getPokemonIdFormated, getPokemonTypeBackground } from 'src/utilities'
import { PublicRoutes } from 'src/models/routes.model'

const PokemonDetail = () => {
	const { pokemon = '' } = useParams()
	const [activeTab, setActiveTab] = useState<string | number>(0)
	const [evolutionChainId, setEvolutionChainId] = useState<number | null>(null)

	const [pokemonData, isLoading, hasError] = useGetPokemon(pokemon)
	const [speciesData] = useGetPokemonSpecies(pokemon)
	const [evolutionData, evolutionPokemons] =
		useGetEvolutionChain(evolutionChainId)

	useEffect(() => {
		if (speciesData.evolutionChainId) {
			setEvolutionChainId(speciesData.evolutionChainId)
		}
	}, [speciesData])

	const handleChangeTab = (value: string | number) => {
		setActiveTab(value)
	}

	const containerClass = classNames(
		'h-screen',
		'max-h-screen',
		getPokemonTypeBackground(pokemonData.types?.[0])
	)

	if (hasError) {
		return <Navigate to={PublicRoutes.NOT_FOUND} replace={true} />
	}

	if (isLoading) {
		return (
			<AnimatePage>
				<div className='bg-gray-500'>
					<div className='p-4 h-screen max-h-screen flex items-center justify-center animate-pulse'>
						<PokeballIcon className='w-64 h-64 fill-white' />
					</div>
				</div>
			</AnimatePage>
		)
	}

	return (
		<AnimatePage>
			<div className={containerClass}>
				<div className='container mx-auto p-4' style={{ maxWidth: 600 }}>
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<Button
								circle
								ghost
								className='bg-white/20 hover:bg-white/30 text-white mr-4'
								to={PublicRoutes.HOME}
							>
								<Text className='leading-none'>
									<FaArrowLeft />
								</Text>
							</Button>
							<div>
								<div className='mb-2'>
									<Text
										className='text-white'
										weight='bold'
										size='h5'
										transform='capitalize'
									>
										{pokemonData.name}
									</Text>
								</div>
								<div className='flex gap-1'>
									{pokemonData.types?.map((type) => (
										<Babge
											key={type}
											size='lg'
											className='bg-white/30 text-white'
										>
											{type}
										</Babge>
									))}
								</div>
							</div>
						</div>
						<div>
							<Text className='text-white/70' size='h6' weight='extrabold'>
								#{getPokemonIdFormated(pokemonData.id)}
							</Text>
						</div>
					</div>
					<div
						className='relative flex items-center justify-center'
						style={{ minHeight: 350 }}
					>
						<figure className='z-10'>
							<img
								src={pokemonData.sprite}
								alt={pokemon}
								className='my-8'
								style={{ width: 250 }}
							/>
						</figure>
						<figure className='absolute pointer-events-none z-0'>
							<PokeballIcon className='w-80 h-80 fill-white' />
						</figure>
					</div>
				</div>
				<div
					className='bg-base-100 rounded-t-3xl'
					style={{ minHeight: 'calc(100% - 450px)' }}
				>
					<div className='mx-auto' style={{ maxWidth: 600 }}>
						<Tabs
							size='lg'
							grow
							bordered
							value={activeTab}
							onChange={handleChangeTab}
						>
							<Tab value={0}>About</Tab>
							<Tab value={1}>Base stats</Tab>
							<Tab value={2}>Evolutions</Tab>
							{/* <Tab value={3}>Moves</Tab> */}
						</Tabs>
						<TabPanels value={activeTab}>
							<TabAbout value={0} pokemon={pokemonData} species={speciesData} />
							<TabStats value={1} stats={pokemonData.stats} />
							<TabEvolutions
								value={2}
								evolution={evolutionData}
								pokemons={evolutionPokemons}
							/>
						</TabPanels>
					</div>
				</div>
			</div>
		</AnimatePage>
	)
}

export default PokemonDetail
