import React from 'react'
import classNames from 'classnames'
import Text from 'src/components/ui/atoms/Text'

type BabgeSize = 'xs' | 'sm' | 'md' | 'lg'

export interface BabgeProps {
	block?: boolean
	children: undefined | React.ReactNode | React.ReactNode[]
	className?: string
	outlined?: boolean
	size?: BabgeSize
	style?: React.CSSProperties
}

const sizeOptions: Record<BabgeSize, string> = {
	xs: 'badge-xs',
	sm: 'badge-sm',
	md: 'badge-md',
	lg: 'badge-lg',
}

const Babge = React.forwardRef<HTMLDivElement, BabgeProps>(function Babge(
	props,
	ref
) {
	const { block, children, className, outlined, size } = props

	const getBabgeSize = (size: BabgeSize = 'md'): string => {
		return sizeOptions[size]
	}

	const babgeClass = classNames('badge', className, getBabgeSize(size), {
		'w-full': block,
		'border-0': !outlined,
		'badge-outline': outlined,
	})

	return (
		<div className={babgeClass} ref={ref}>
			<Text className='font-medium' size='overline' transform='capitalize'>
				{children}
			</Text>
		</div>
	)
})

export default Babge
