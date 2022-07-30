import { RefObject, useEffect, useState } from 'react'

function useOnHover<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>
): boolean {
	const [value, setValue] = useState(false)
	const handleMouseOver = () => setValue(true)
	const handleMouseOut = () => setValue(false)

	useEffect(() => {
		const node = ref.current
		if (node) {
			node.addEventListener('mouseover', handleMouseOver)
			node.addEventListener('mouseout', handleMouseOut)
			return () => {
				node.removeEventListener('mouseover', handleMouseOver)
				node.removeEventListener('mouseout', handleMouseOut)
			}
		}
	}, [ref.current])

	return value
}

export default useOnHover
