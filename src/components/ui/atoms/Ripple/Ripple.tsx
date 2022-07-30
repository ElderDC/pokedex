import { useState, useLayoutEffect, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

interface RippleProps {
	duration?: number
}
interface IRipple {
	x?: number
	y?: number
	duration?: number
}

const useDebouncedRippleCleanUp = (
	rippleCount: number,
	duration: number,
	cleanUpFunction: Function
) => {
	useLayoutEffect(() => {
		let bounce: any = null
		if (rippleCount > 0) {
			clearTimeout(bounce)
			bounce = setTimeout(() => {
				cleanUpFunction()
				clearTimeout(bounce)
			}, duration * 2)
		}

		return () => clearTimeout(bounce)
	}, [rippleCount, duration, cleanUpFunction])
}

const Ripple = (props: RippleProps) => {
	// Props
	const { duration = 300 } = props
	// State
	const [ripples, setRipples] = useState<IRipple[]>([])

	useDebouncedRippleCleanUp(ripples.length, duration, () => {
		setRipples([])
	})

	const addRipple = (event: MouseEvent<HTMLElement>): void => {
		const rect = event.currentTarget.getBoundingClientRect()
		const x = event.clientX - rect.x
		const y = event.clientY - rect.y
		const newRipple: IRipple = { x, y, duration }
		setRipples((prevState: IRipple[]) => [...prevState, newRipple])
	}

	const rippleClass = classNames(
		'ripple',
		'animate-ripple',
		'absolute top-1/2 left-1/2',
		'w-0 h-0',
		'transform -translate-y-1/2 -translate-x-1/2',
		'rounded-full',
		'bg-current',
		'text-inherit',
		'pointer-events-none'
	)

	const containerClass = classNames(
		'ripple__container',
		'absolute top-0 left-0',
		'w-full h-full',
		'bg-transparent',
		'text-inherit',
		'overflow-hidden'
	)

	return (
		<div className={containerClass} onMouseDown={addRipple}>
			{ripples.length > 0 &&
				ripples.map((ripple, index) => (
					<span
						key={'ripple_' + index}
						className={rippleClass}
						style={{
							left: ripple.x,
							top: ripple.y,
							animationDuration: `${ripple.duration}ms`,
						}}
					/>
				))}
		</div>
	)
}

Ripple.defaultProps = {
	duration: 300,
}

Ripple.propTypes = {
	duration: PropTypes.number,
}

export default Ripple
