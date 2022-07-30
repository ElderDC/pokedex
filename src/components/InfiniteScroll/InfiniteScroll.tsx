import { ReactElement, useEffect } from 'react'
import { useOnScreen } from 'src/hooks'

interface InfiniteScrollProps<T> {
	listItems: T[]
	scrollTrigger: ReactElement
	scrollTriggerHandler: () => void
}

const InfiniteScroll = (props: InfiniteScrollProps<any>) => {
	const { listItems, scrollTrigger, scrollTriggerHandler } = props
	const [scrollTriggerRef, scrollTriggerOnScreen] =
		useOnScreen<HTMLDivElement>()

	// if last row is in view, call the last row handler

	useEffect(() => {
		scrollTriggerOnScreen && scrollTriggerHandler()
	}, [scrollTriggerOnScreen])

	const Elements = listItems.map((item, index) => {
		return (
			<div key={index} ref={scrollTrigger ? undefined : scrollTriggerRef}>
				{item}
			</div>
		)
	})
	return (
		<>
			{Elements}
			{scrollTrigger || null}
		</>
	)
}

export default InfiniteScroll
