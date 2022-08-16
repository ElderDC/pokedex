import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PublicRoutes } from './models/routes.model'

const Home = lazy(() => import('./pages/Home/Home'))
const Pokemon = lazy(() => import('./pages/Pokemon/Pokemon'))
const Error404 = lazy(() => import('./pages/Error404/Error404'))

function App() {
	const location = useLocation()

	return (
		<Suspense fallback={<>Cargando...</>}>
			<AnimatePresence exitBeforeEnter>
				<Routes location={location} key={location.pathname}>
					<Route path='/' element={<Navigate to={PublicRoutes.HOME} />} />
					<Route path={PublicRoutes.HOME} element={<Home />} />
					<Route path={PublicRoutes.POKEMON} element={<Pokemon />} />
					<Route path='/*' element={<Error404 />} />
				</Routes>
			</AnimatePresence>
		</Suspense>
	)
}

export default App
