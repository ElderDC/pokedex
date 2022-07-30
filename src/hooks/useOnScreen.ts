import { useState, useEffect, useRef, RefObject } from 'react'

function useOnScreen<T extends HTMLElement = HTMLElement>(
	rootMargin = 0
): [RefObject<T>, boolean] {
	// State and setter for storing whether element is visible
	const refOnScreen = useRef(null)
	const [onScreen, setOnScreen] = useState(false)
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				// Update our state when observer callback fires
				setOnScreen(entry.isIntersecting)
			},
			{
				rootMargin: `${rootMargin}px`,
			}
		)

		if (refOnScreen.current) {
			observer.observe(refOnScreen.current)
		}

		return () => {
			if (refOnScreen.current) {
				observer.unobserve(refOnScreen.current)
			}
		}
	}, []) // Empty array ensures that effect is only run on mount and unmount
	return [refOnScreen, onScreen]
}

export default useOnScreen
