import Home from 'src/pages/Home'
import Pokemon from 'src/pages/Pokemon'
import Error404 from 'src/pages/Error404'

const routes = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/pokemon/:pokemon',
		element: <Pokemon />,
	},
	{
		path: '/*',
		element: <Error404 />,
	},
]

export default routes
