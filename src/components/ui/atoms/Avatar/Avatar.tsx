import React from 'react'
import classNames from 'classnames'

const noop = (): false => {
	return false
}

type Handler = (_event: React.MouseEvent) => void

interface AvatarProps {
	bgColor?: string
	children?: undefined | React.ReactNode | React.ReactNode[]
	className?: string
	mask?: string
	rounded?: boolean
	style?: React.CSSProperties
	width?: string
	onClick?: Handler
	onDoubleClick?: Handler
	onMouseDown?: Handler
	onMouseUp?: Handler
}

const Avatar = React.forwardRef<any, AvatarProps>(function Avatar(props, ref) {
	const {
		bgColor = 'bg-primary',
		children,
		className,
		style,
		rounded,
		width = 'w-12',
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

	const avatarClass = classNames(
		'avatar',
		'hover:z-20',
		'cursor-default',
		'transition'
	)

	const avatarContentClass = classNames(bgColor, width, className, {
		'rounded-full': rounded,
	})

	return (
		<div
			ref={ref}
			className={avatarClass}
			style={style}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			<div className={avatarContentClass}>{children}</div>
		</div>
	)
})

export default Avatar
