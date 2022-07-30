import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Pokemon from './pages/Pokemon'
import Error404 from './pages/Error404'

function App() {
	const location = useLocation()

	return (
		<AnimatePresence exitBeforeEnter>
			<Routes location={location} key={location.pathname}>
				<Route path='/' element={<Home />} />
				<Route path='/pokemon/:pokemon' element={<Pokemon />} />
				<Route path='/*' element={<Error404 />} />
			</Routes>
		</AnimatePresence>
	)
}

export default App
