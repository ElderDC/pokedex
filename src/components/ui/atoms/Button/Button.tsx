import React from 'react'
import classNames from 'classnames'
import Ripple from '@/components/ui/atoms/Ripple'
import { Link, To } from 'react-router-dom'

type Handler = (_event: React.MouseEvent) => void

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

interface ButtonProps {
	block?: boolean
	children: undefined | React.ReactNode | React.ReactNode[]
	circle?: boolean
	className?: string
	href?: string
	ghost?: boolean
	outlined?: boolean
	size?: ButtonSize
	style?: React.CSSProperties
	square?: boolean
	text?: boolean
	to?: To
	type?: 'button' | 'submit' | 'reset' | undefined
	onClick?: Handler
	onDoubleClick?: Handler
	onMouseDown?: Handler
	onMouseUp?: Handler
}

const noop = (): false => {
	return false
}

const sizeOptions: Record<ButtonSize, string> = {
	xs: 'badge-xs',
	sm: 'badge-sm',
	md: 'badge-md',
	lg: 'badge-lg',
}

const Button = React.forwardRef<any, ButtonProps>(function Button(props, ref) {
	const {
		block = false,
		children,
		circle,
		className,
		href,
		ghost = false,
		outlined,
		size = 'md',
		style,
		square,
		text = false,
		to,
		type = 'button',
		onClick = noop,
		onDoubleClick = noop,
		onMouseDown = noop,
		onMouseUp = noop,
	} = props

	const getButtonSize = (size: ButtonSize): string => {
		return sizeOptions[size]
	}
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

	const btnClass = classNames('btn', className, getButtonSize(size), {
		'btn-block': block,
		'btn-circle': circle,
		'btn-ghost': ghost,
		'btn-outlined': outlined,
		'btn-square': square,
		'btn-text': text,
		'overflow-hidden': true,
		relative: true,
	})

	if (to) {
		return (
			<Link
				to={to}
				className={btnClass}
				style={style}
				onClick={handleClick}
				onDoubleClick={handleDoubleClick}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			>
				{children}
				<Ripple />
			</Link>
		)
	}

	if (href) {
		return (
			<a
				ref={ref}
				href={href}
				className={btnClass}
				style={style}
				onClick={handleClick}
				onDoubleClick={handleDoubleClick}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			>
				{children}
				<Ripple />
			</a>
		)
	}

	return (
		<button
			ref={ref}
			className={btnClass}
			style={style}
			type={type}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			{children}
			<Ripple />
		</button>
	)
})

export default Button
