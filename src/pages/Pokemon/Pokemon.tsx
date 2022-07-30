import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	Pokemon,
	PokemonEvolution,
	PokemonSprecies,
} from 'src/models/pokemon.model'
import {
	getEvolutionChain,
	getPokemon,
	getPokemonSpecies,
} from 'src/services/pokemon.service'
import { createPokemonAdapter } from 'src/adapters/pokemon.adapter'
import {
	createEvolutionChainAdapter,
	createListEvolutionChainAdapter,
} from 'src/adapters/evolution.adapter'
import {
	getPokemonIdFormated,
	getPokemonTypeBackground,
	ruleOfThree,
} from 'src/utilities'
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
import TabPanel from 'src/components/ui/atoms/TabPanel/TabPanel'
import Progress from 'src/components/ui/atoms/Progress'
import EvolutionChain from 'src/components/Pokemon/EvolutionChain'
import Divider from 'src/components/ui/atoms/Divider'
import { createSpeciesAdapter } from 'src/adapters/species.adapter'

const PokemonDetail = () => {
	const navigate = useNavigate()
	const { pokemon } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const [activeTab, setActiveTab] = useState<string | number>(0)
	const [totalStats, setTotalStats] = useState<number>(0)
	const [totalValueStats, setTotalValueStats] = useState<number>(0)
	const [pokemonData, setPokemonData] = useState<Pokemon>({} as Pokemon)
	const [speciesData, setSpeciesData] = useState<PokemonSprecies>(
		{} as PokemonSprecies
	)
	const [evolutionData, setEvolutionData] = useState<PokemonEvolution>(
		{} as PokemonEvolution
	)
	const [evolutionPokemons, setEvolutionPokemons] = useState<
		Record<string, Pokemon>
	>({})

	useEffect(() => {
		if (pokemon) {
			fetchPokemon(pokemon)
			fetchPokemonSpecies(pokemon)
		}
	}, [pokemon])

	useEffect(() => {
		if (speciesData.evolutionChainId) {
			fetchEvolutionChain(speciesData.evolutionChainId)
		}
	}, [speciesData])

	const fetchPokemon = async (data: string) => {
		try {
			setIsLoading(true)
			const response = await getPokemon(data)
			const pokemonAdapted = createPokemonAdapter(response)
			setPokemonData(pokemonAdapted)
			setTotalStats(pokemonAdapted.stats.length)
			setTotalValueStats(
				pokemonAdapted.stats.reduce(
					(accumulator, currentValue) => accumulator + currentValue.value,
					0
				)
			)
		} catch (error: any) {
			if (error?.response?.status === 404) {
				navigate('/not-found')
			}
		} finally {
			setIsLoading(false)
		}
	}

	const fetchPokemonSpecies = async (data: string) => {
		try {
			const responseSpecies = await getPokemonSpecies(data)
			const speciesAdapted = createSpeciesAdapter(responseSpecies)
			setSpeciesData(speciesAdapted)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchEvolutionChain = async (data: number) => {
		try {
			const responseEvolutionChain = await getEvolutionChain(data)
			const evolutionChainAdapted = createEvolutionChainAdapter(
				responseEvolutionChain.chain
			)
			const listEvolutionChainAdapted = createListEvolutionChainAdapter(
				responseEvolutionChain.chain
			)
			const evolutionPokemons = await Promise.all(
				listEvolutionChainAdapted.map(async (element) => {
					const pokemon = await getPokemon(element)
					const simplePokemon = createPokemonAdapter(pokemon)
					return simplePokemon
				})
			)
			const evolutionPokemonsObject = evolutionPokemons.reduce(
				(object, element) => ({ ...object, [element.name]: element }),
				{}
			)
			setEvolutionData(evolutionChainAdapted)
			setEvolutionPokemons(evolutionPokemonsObject)
		} catch (error) {
			console.log(error)
		}
	}

	const handleChangeTab = (value: string | number) => {
		setActiveTab(value)
	}

	const getColorStat = (value: number, max: number): string => {
		const statProgress = ruleOfThree(value, max)

		if (statProgress >= 66) {
			return 'bg-green-500'
		} else if (statProgress >= 33) {
			return 'bg-amber-500'
		} else {
			return 'bg-red-500'
		}
	}

	const renderEvolutionChain = (
		data: PokemonEvolution
	): undefined | React.ReactNode | React.ReactNode[] => {
		const { name, evolutions = [] } = data
		const pokemonFrom = evolutionPokemons[name]
		return evolutions.map((item: PokemonEvolution, index: number) => {
			const pokemonTo = evolutionPokemons[item.name]
			const showDivider =
				index + 1 < evolutions.length || item.evolutions?.length > 0
			return (
				<>
					<EvolutionChain
						pokemonFrom={pokemonFrom}
						pokemonTo={pokemonTo}
						details={item.details}
					/>
					{showDivider && <Divider />}
					{renderEvolutionChain(item)}
				</>
			)
		})
	}

	return (
		<AnimatePage>
			{isLoading ? (
				<div className='bg-gray-500'>
					<div className='p-4 h-screen max-h-screen flex items-center justify-center animate-pulse'>
						<PokeballIcon className='w-64 h-64 fill-white' />
					</div>
				</div>
			) : (
				<div
					className={classNames(
						'h-screen',
						'max-h-screen',
						getPokemonTypeBackground(pokemonData.types?.[0])
					)}
				>
					<div className='container mx-auto p-4' style={{ maxWidth: 600 }}>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<Button
									circle
									ghost
									className='bg-white/20 hover:bg-white/30 text-white mr-4'
									to='/'
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
								<TabPanel value={0} className='p-8 space-y-4'>
									<div>
										<Text>{speciesData.flavorText}</Text>
									</div>
									<div className='grid gap-4 grid-cols-3'>
										<Text weight='medium'>Species</Text>
										<Text className='col-span-2' weight='medium'>
											{speciesData.genera}
										</Text>
									</div>
									<div className='grid gap-4 grid-cols-3'>
										<Text weight='medium'>Height</Text>
										<Text className='col-span-2' weight='medium'>
											{(pokemonData.height * 0.1).toFixed(2)} m
										</Text>
									</div>
									<div className='grid gap-4 grid-cols-3'>
										<Text weight='medium'>Weight</Text>
										<Text className='col-span-2' weight='medium'>
											{(pokemonData.weight * 0.1).toFixed(2)} kg
										</Text>
									</div>
									<div className='grid gap-4 grid-cols-3'>
										<Text weight='medium'>Abilities</Text>
										<Text className='col-span-2' weight='medium'>
											{pokemonData.abilities.join(', ')}
										</Text>
									</div>
								</TabPanel>
								<TabPanel value={1} className='p-8 space-y-4'>
									{pokemonData.stats.map((stat) => (
										<div key={stat.name} className='grid gap-4 grid-cols-3'>
											<Text weight='medium' transform='capitalize'>
												{stat.name}
											</Text>
											<div className='col-span-2 flex items-center'>
												<Text
													className='w-10 mr-4'
													align='right'
													weight='medium'
												>
													{stat.value}
												</Text>
												<Progress
													value={stat.value}
													color={getColorStat(stat.value, 100)}
													rounded
												></Progress>
											</div>
										</div>
									))}
									<div className='grid gap-4 grid-cols-3'>
										<Text weight='medium' transform='capitalize'>
											Total
										</Text>
										<div className='col-span-2 flex items-center'>
											<Text className='w-10 mr-4' align='right' weight='medium'>
												{totalValueStats}
											</Text>
											<Progress
												value={totalValueStats}
												max={totalStats * 100}
												color={getColorStat(totalValueStats, totalStats * 100)}
												rounded
											></Progress>
										</div>
									</div>
								</TabPanel>
								<TabPanel value={2} className='p-8'>
									<div className='mb-8'>
										<Text size='subtitle1' weight='bold'>
											Evolution chain
										</Text>
									</div>
									<div className='space-y-4'>
										{renderEvolutionChain(evolutionData)}
									</div>
								</TabPanel>
							</TabPanels>
						</div>
					</div>
				</div>
			)}
		</AnimatePage>
	)
}

export default PokemonDetail
