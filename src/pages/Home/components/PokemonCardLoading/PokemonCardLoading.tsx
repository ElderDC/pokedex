import Card from '@/components/ui/atoms/Card'
import CardBody from '@/components/ui/atoms/CardBody'

const PokemonCardLoading = () => {
	return (
		<Card bgColor='bg-slate-500' shadow>
			<div className='mt-6 flex items-center justify-center animate-pulse'>
				<div className='w-40 h-40 p-4 z-10 bg-slate-400 rounded-lg' />
			</div>
			<CardBody className='items-center text-center animate-pulse'>
				<div className='h-6 w-24 bg-slate-400 rounded-xl'></div>
				<div className='grid grid-cols-2 gap-2'>
					<div className='h-6 w-16 bg-slate-400 rounded-xl col-span-1'></div>
					<div className='h-6 w-16 bg-slate-400 rounded-xl col-span-1'></div>
				</div>
			</CardBody>
		</Card>
	)
}

export default PokemonCardLoading
