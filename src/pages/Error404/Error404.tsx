import AnimatePage from 'src/components/AnimatePage'
import Button from 'src/components/ui/atoms/Button'
import Card from 'src/components/ui/atoms/Card'
import CardActions from 'src/components/ui/atoms/CardActions'
import CardBody from 'src/components/ui/atoms/CardBody'
import CardHead from 'src/components/ui/atoms/CardHead'
import Menu from 'src/components/ui/atoms/Menu'
import Text from 'src/components/ui/atoms/Text'
import Tooltip from 'src/components/ui/atoms/Tooltip'

const Error404 = () => {
	return (
		<AnimatePage>
			{/* <Tooltip content="Contenido">
				<Button
					className='btn-primary absolute'
					style={{ top: 0, left: 500 }}
				>
					Error404
				</Button>
			</Tooltip> */}
			<Tooltip bottom content='Texto de prueba' bgColor='bg-primary/80'>
				<Text className='absolute' style={{ top: 500, left: 500 }}>
					Ejemplo
				</Text>
			</Tooltip>
			<Menu
				left
				top
				offsetX
				trigger={
					<Button
						className='btn-primary absolute'
						style={{ top: 800, left: 1300, marginBottom: 1500 }}
					>
						Error404
					</Button>
				}
			>
				<Card className='shadow-black/20 w-96' shadow>
					<figure>
						<img src='https://placeimg.com/400/225/arch' alt='Shoes' />
					</figure>
					<div>
						<CardHead>
							<Text size='h6'>Shoes!</Text>
						</CardHead>
						<CardBody>
							<Text>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							</Text>
						</CardBody>
						<CardActions className='justify-end'>
							<Button className='text-primary' text>
								cancel
							</Button>
							<Button className='btn-primary'>Buy now</Button>
						</CardActions>
					</div>
				</Card>
			</Menu>
		</AnimatePage>
	)
}

export default Error404
