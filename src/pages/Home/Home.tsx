import { ChangeEvent, useEffect, useState } from 'react'
import { useOnScreen } from 'src/hooks'
import { SimplePokemon } from 'src/models/pokemon.model'
import { listPokemons } from 'src/services/pokemon.service'
import { createListSimplePokemonAdapter } from 'src/adapters/pokemon.adapter'
import { joinDataToSearch } from 'src/utilities'
import { ReactComponent as PokeballIcon } from 'src/assets/svg/pokeball.svg'
import classNames from 'classnames'
import AnimatePage from 'src/components/AnimatePage'
import PokemonCard from 'src/components/PokemonCard'
import PokemonIcon from 'src/assets/svg/pokemon.svg'
import VirtualScroll from 'src/components/VirtualScroll'

const Home = () => {
	const [pokemons, setPokemons] = useState<SimplePokemon[]>([])
	const [total, setTotal] = useState<number>(0)
	const [offset, setOffset] = useState<number>(0)
	const [limit, _setLimit] = useState<number>(24)
	const [search, setSearch] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [infiniteScrollRef, infiniteScrollRefOnScreen] =
		useOnScreen<HTMLDivElement>(-70)

	useEffect(() => {
		if (infiniteScrollRefOnScreen && search === '') fetchPokemons()
	}, [infiniteScrollRefOnScreen])

	const fetchPokemons = async () => {
		try {
			setIsLoading(true)
			const { results, count } = await listPokemons(offset * limit, limit)
			const pokemonAdapted = createListSimplePokemonAdapter(results)
			setPokemons((preVal) => [...preVal, ...pokemonAdapted])
			setOffset((prev) => prev + 1)
			setTotal(count)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const searchFunction = (pokemon: SimplePokemon): boolean => {
		const searchLower = joinDataToSearch(search)
		return pokemon.name.toLowerCase().includes(searchLower)
	}

	return (
		<AnimatePage>
			<div className='container mx-auto p-4'>
				<div
					className='flex flex-col items-center justify-center'
					style={{ minHeight: 500 }}
				>
					<img src={PokemonIcon} alt='pokemon-logo' className='h-32 mb-8' />
					<input
						value={search}
						type='search'
						placeholder='Search an pokemon'
						className='input input-lg w-full rounded-full max-w-xl bg-white'
						onInput={handleSearch}
					/>
				</div>
			</div>
			<div className='container mx-auto p-4'>
				<div className='grid gap-4 grid-cols-12'>
					{pokemons.filter(searchFunction).map((pokemon) => (
						<VirtualScroll
							key={pokemon.name}
							minItemHeight={320}
							className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3'
						>
							<PokemonCard pokemon={pokemon.name} />
						</VirtualScroll>
					))}
				</div>
			</div>
			{(total === 0 || total > pokemons.length) && (
				<div
					ref={infiniteScrollRef}
					className='flex items-center justify-center py-8'
				>
					<div className='flex space-x-4'>
						{[0, 1, 2].map((item) => (
							<PokeballIcon
								key={item}
								className={classNames('w-8', 'h-8', 'fill-white/50', {
									'animate-bounce': isLoading,
								})}
								style={{
									animationDelay: `${item * 0.33}s`,
								}}
							/>
						))}
					</div>
				</div>
			)}
		</AnimatePage>
	)
}

export default Home
