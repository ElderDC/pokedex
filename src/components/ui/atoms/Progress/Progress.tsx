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
		'h-2': true,
		'w-full': true,
		'overflow-hidden': true,
		'rounded-full': rounded,
	})
	const progressBarClass = classNames(color, 'h-full')
	const progressBarStyle = {
		width: `${progressValue}%`,
	}

	useEffect(() => {
		setprogressValue((value * 100) / (max || 100))
	}, [value])

	return (
		<div className={progressClass}>
			<motion.div
				initial={{ width: 0 }}
				animate={progressBarStyle}
				transition={{ duration: 0.5 }}
				className={progressBarClass}
			></motion.div>
		</div>
	)
}

Progress.defaultProps = {}

export default Progress
