import React from 'react'
import classNames from 'classnames'
import Ripple from 'src/components/ui/atoms/Ripple'
import Text from 'src/components/ui/atoms/Text'

const noop = (): false => {
	return false
}

type TabSize = 'xs' | 'sm' | 'md' | 'lg'

interface TabProps {
	bordered?: boolean
	className?: string
	children: React.ReactNode
	grow?: boolean
	active: boolean
	size: TabSize
	value: string | number
	onClick: (_value: string | number) => void
}

const sizeOptions: Record<TabSize, string> = {
	xs: 'tab-xs',
	sm: 'tab-sm',
	md: 'tab-md',
	lg: 'tab-lg',
}

const Tab = (props: TabProps) => {
	const { bordered, className, children, grow, active, size, value, onClick } =
		props

	const getTabSize = (size: TabSize = 'md'): string => {
		return sizeOptions[size]
	}

	const handleClick = (): void => {
		onClick(value)
	}

	const tabClass = classNames('tab', 'relative', getTabSize(size), className, {
		'tab-bordered': bordered,
		'flex-1': grow,
		'tab-active': active,
	})

	return (
		<a className={tabClass} onClick={handleClick}>
			<Text weight='semibold'>{children}</Text>
			<Ripple />
		</a>
	)
}

Tab.defaultProps = {
	active: false,
	size: 'md',
	onClick: noop,
}

export default Tab
