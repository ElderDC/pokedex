import { useEffect, useRef } from 'react'

function usePreviousValue(value: any): any {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}

export default usePreviousValue
