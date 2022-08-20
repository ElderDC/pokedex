import { ReactNode } from 'react'
import { useOnScreen } from '@/hooks'

interface VirtualScrollProps {
	children: ReactNode
	className?: string
	minItemHeight: number
}

const VirtualScrollChild = (props: VirtualScrollProps) => {
	const { minItemHeight, children, className } = props
	const [virtualScrollRef, virtualScrollOnScreen] =
		useOnScreen<HTMLDivElement>()
	const style = {
		minHeight: `${minItemHeight}px`,
	}
	return (
		<div style={style} ref={virtualScrollRef} className={className}>
			{virtualScrollOnScreen ? children : null}
		</div>
	)
}

export default VirtualScrollChild
