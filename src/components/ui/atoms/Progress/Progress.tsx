import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import classNames from 'classnames'

interface ProgressProps {
	className?: string
	bgColor?: string
	color?: string
	indeterminate?: boolean
	max?: number
	rounded?: boolean
	value?: number
}

const Progress = (props: ProgressProps) => {
	const {
		className,
		bgColor = 'bg-black/10',
		color = 'bg-black',
		indeterminate,
		max = 100,
		rounded,
		value = 0,
	} = props

	const [progressValue, setprogressValue] = useState(0)

	const progressClass = classNames(bgColor, className, {
		relative: true,
		'h-2': true,
		'w-full': true,
		'overflow-hidden': true,
		'rounded-full': rounded,
	})
	const progressBarClass = classNames(color, 'h-full', {
		'animate-indeterminate-short-ltr': indeterminate,
		'w-1/2': indeterminate,
		absolute: indeterminate,
	})

	const variants = {
		initial: indeterminate ? {} : { width: 0 },
		animate: indeterminate ? {} : { width: `${progressValue}%` },
		exit: { opacity: 0, scale: 1 },
	}

	useEffect(() => {
		setprogressValue((value * 100) / (max || 100))
	}, [value])

	return (
		<div className={progressClass}>
			<motion.div
				variants={variants}
				initial='initial'
				animate='animate'
				transition={{ duration: 0.5 }}
				className={progressBarClass}
			></motion.div>
		</div>
	)
}

Progress.defaultProps = {}

export default Progress
