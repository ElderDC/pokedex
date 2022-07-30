import React from 'react'
import classNames from 'classnames'

const noop = (): false => {
	return false
}

type TabSize = 'xs' | 'sm' | 'md' | 'lg'

interface TabsProps {
	bordered?: boolean
	centered?: boolean
	className?: string
	children: React.ReactNode
	grow?: boolean
	size: TabSize
	value: string | number
	onChange: (value: string | number) => void
}

const Tabs = (props: TabsProps) => {
	const {
		value,
		bordered,
		centered,
		className,
		children,
		grow,
		size,
		onChange,
	} = props

	const tabsClass = classNames('tabs', className, {
		'justify-center': centered,
	})

	const handleTabClick = (value: string | number) => {
		onChange(value)
	}

	return (
		<div className={tabsClass}>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					const tabValue = child.props?.value
					const childCloned = React.cloneElement(child, {
						active: value === tabValue,
						bordered,
						grow,
						size,
						onClick: (payload: string | number) => handleTabClick(payload),
					})
					return childCloned
				}
			})}
		</div>
	)
}

Tabs.defaultProps = {
	size: 'md',
	value: 0,
	onChange: noop,
}

export default Tabs
