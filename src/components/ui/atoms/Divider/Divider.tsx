import React from 'react'
import classNames from 'classnames'

interface DividerProps {
	children?: undefined | React.ReactNode | React.ReactNode[]
	className?: string
	horizontal?: boolean
	vertical?: boolean
	style?: React.CSSProperties
}

const Divider = (props: DividerProps) => {
	const { children, className, horizontal, vertical, style } = props

	const dividerClass = classNames('divider', className, {
		'divider-horizontal': horizontal,
		'divider-vertical': vertical,
	})

	return (
		<div className={dividerClass} style={style}>
			{children}
		</div>
	)
}

export default Divider
