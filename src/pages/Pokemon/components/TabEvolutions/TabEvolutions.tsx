import React from 'react'
import { Pokemon, PokemonEvolution } from 'src/models/pokemon.model'
import Divider from 'src/components/ui/atoms/Divider'
import TabPanel from 'src/components/ui/atoms/TabPanel'
import Text from 'src/components/ui/atoms/Text'
import EvolutionChainItem from '../EvolutionChainItem'

type TabEvolutionsProps = {
	value: number | string
	evolution: PokemonEvolution
	pokemons: Record<string, Pokemon>
}

const TabEvolutions = (props: TabEvolutionsProps) => {
	const { value, evolution, pokemons } = props

	const renderEvolutionChain = (
		data: PokemonEvolution
	): undefined | React.ReactNode | React.ReactNode[] => {
		const { name, evolutions = [] } = data
		const pokemonFrom = pokemons[name]
		return evolutions.map((item: PokemonEvolution, index: number) => {
			const pokemonTo = pokemons[item.name]
			const showDivider =
				index + 1 < evolutions.length || item.evolutions?.length > 0
			return (
				<>
					<EvolutionChainItem
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
		<TabPanel value={value} className='p-8'>
			<div className='mb-8'>
				<Text size='subtitle1' weight='bold'>
					Evolution chain
				</Text>
			</div>
			<div className='space-y-4'>{renderEvolutionChain(evolution)}</div>
		</TabPanel>
	)
}

export default TabEvolutions
