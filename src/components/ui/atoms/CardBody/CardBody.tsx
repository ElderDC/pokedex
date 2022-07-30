import classNames from 'classnames'
import React from 'react'

const noop = (): false => {
	return false
}

type Handler = (event: React.MouseEvent) => void

interface CardBodyPops {
	children?: undefined | React.ReactNode | React.ReactNode[]
	className?: string
	style?: React.CSSProperties
	onClick?: Handler
	onDoubleClick?: Handler
	onMouseDown?: Handler
	onMouseUp?: Handler
}

const CardBody = (props: CardBodyPops) => {
	const {
		children,
		className,
		style,
		onClick = noop,
		onDoubleClick = noop,
		onMouseDown = noop,
		onMouseUp = noop,
	} = props

	const handleClick = (event: React.MouseEvent): void => {
		onClick(event)
	}
	const handleDoubleClick = (event: React.MouseEvent): void => {
		onDoubleClick(event)
	}
	const handleMouseDown = (event: React.MouseEvent): void => {
		onMouseDown(event)
	}
	const handleMouseUp = (event: React.MouseEvent): void => {
		onMouseUp(event)
	}

	const cardBodyClass = classNames('card-body', className)

	return (
		<div
			className={cardBodyClass}
			style={style}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			{children}
		</div>
	)
}

export default CardBody
