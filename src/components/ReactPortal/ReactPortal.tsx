import { ReactNode, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { createWrapperAndAppendToBody } from '@/utilities'

interface ReactPortalProps {
	children: ReactNode
	wrapperId: string
}

function ReactPortal(props: ReactPortalProps) {
	const { children, wrapperId = 'portal-root' } = props
	const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId) as HTMLElement
		let systemCreated = false
		// if element is not found with wrapperId or wrapperId is not provided,
		// create and append to body
		if (!element) {
			systemCreated = true
			element = createWrapperAndAppendToBody(wrapperId)
		}
		setWrapperElement(element)

		return () => {
			// delete the programatically created element
			if (systemCreated && element.parentNode) {
				element.parentNode.removeChild(element)
			}
		}
	}, [wrapperId])

	// wrapperElement state will be null on the very first render.
	if (wrapperElement === null) return null

	return createPortal(children, wrapperElement)
}
export default ReactPortal
