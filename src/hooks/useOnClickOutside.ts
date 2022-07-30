import { RefObject, useEffect } from 'react'

type Handler = (_event: MouseEvent | TouchEvent) => void

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	refs: RefObject<T>[],
	handler: Handler
) {
	useEffect(
		() => {
			const listener = (event: MouseEvent | TouchEvent) => {
				const target = event.target as HTMLElement
				// Do nothing if clicking ref's element or descendent elements
				for (let index = 0; index < refs.length; index++) {
					const ref = refs[index]
					if (!ref.current || ref.current.contains(target)) {
						return
					}
				}
				handler(event)
			}
			document.addEventListener('mousedown', (event) => listener(event))
			document.addEventListener('touchstart', (event) => listener(event))
			return () => {
				document.removeEventListener('mousedown', (event) => listener(event))
				document.removeEventListener('touchstart', (event) => listener(event))
			}
		},
		// Add ref and handler to effect dependencies
		// It's worth noting that because passed in handler is a new ...
		// ... function on every render that will cause this effect ...
		// ... callback/cleanup to run every render. It's not a big deal ...
		// ... but to optimize you can wrap handler in useCallback before ...
		// ... passing it into this hook.
		[refs, handler]
	)
}

export default useOnClickOutside
