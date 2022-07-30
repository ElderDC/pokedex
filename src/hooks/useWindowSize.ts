import { useEffect, useState } from 'react'

interface WindowSize {
	width: number
	height: number
}

function useWindowSize(): WindowSize {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: 0,
		height: 0,
	})
	// Handler to call on window resize
	const handleResize = () => {
		// Set window width/height to state
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		})
	}
	useEffect(() => {
		// Add event listener
		window.addEventListener('resize', handleResize)
		// Call handler right away so state gets updated with initial window size
		handleResize()
		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize)
	}, []) // Empty array ensures that effect is only run on mount

	return windowSize
}

export default useWindowSize
