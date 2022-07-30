import React from 'react'
import classNames from 'classnames'
import Ripple from '../Ripple'

const noop = (): false => {
	return false
}

type Handler = (_event: React.MouseEvent) => void

interface CardPops {
	bgColor?: string
	bgImage?: boolean
	children?: undefined | React.ReactNode | React.ReactNode[]
	className?: string
	shadow?: boolean
	side?: boolean
	style?: React.CSSProperties
	onClick?: Handler
	onDoubleClick?: Handler
	onMouseDown?: Handler
	onMouseUp?: Handler
}

const Card = (props: CardPops) => {
	const {
		bgColor = 'bg-white',
		bgImage,
		children,
		className,
		shadow,
		side,
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

	const cardClass = classNames('card', bgColor, className, {
		'card-side': side,
		'image-full': bgImage,
		'shadow-xl': shadow,
	})

	return (
		<div
			className={cardClass}
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

Card.defaultProps = {
	bgColor: 'bg-base-100',
	className: '',
	style: {},
	onClick: noop,
	onDoubleClick: noop,
	onMouseDown: noop,
	onMouseUp: noop,
}

export default Card
