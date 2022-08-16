import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface TabPanelsProps {
	children?: React.ReactNode
	value: string | number
}

const TabPanels = (props: TabPanelsProps) => {
	const { children, value } = props

	const [[currentValue, direction], setDirection] = useState<
		[string | number, number]
	>([0, 1])

	const variants = {
		enter: (direction: number) => {
			return {
				x: direction > 0 ? '100%' : '-100%',
				opacity: 0,
				position: 'absolute' as const,
			}
		},
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
			position: 'static' as const,
		},
		exit: (direction: number) => {
			return {
				zIndex: 0,
				x: direction > 0 ? '-100%' : '100%',
				opacity: 0,
				position: 'absolute' as const,
			}
		},
	}

	useEffect(() => {
		handleChangeValue()
	}, [value])

	const handleChangeValue = () => {
		setDirection((preValue) => calcDirecton(preValue))
	}

	const calcDirecton = (
		prevValue: [string | number, number]
	): [string | number, number] => {
		const [prevCurrentValue] = prevValue
		const childrenArray = React.Children.toArray(children)
		const tabPanelValueArray = childrenArray.map((child) => {
			if (React.isValidElement(child)) {
				return child?.props?.value
			}
			return false
		})

		const prevValueIndex = tabPanelValueArray.findIndex(
			(item) => item === prevCurrentValue
		)
		const currentValueIndex = tabPanelValueArray.findIndex(
			(item) => item === value
		)

		return [value, currentValueIndex > prevValueIndex ? 1 : -1]
	}

	return (
		<div className='overflow-hidden relative h-full'>
			<AnimatePresence initial={false} custom={direction}>
				{React.Children.map(children, (child, index) => {
					if (React.isValidElement(child)) {
						const tabValue = child?.props?.value
						return (
							tabValue === currentValue && (
								<motion.div
									key={index}
									custom={direction}
									variants={variants}
									initial='enter'
									animate='center'
									exit='exit'
									transition={{ duration: 0.3 }}
									className='w-full'
								>
									{child}
								</motion.div>
							)
						)
					}
				})}
			</AnimatePresence>
		</div>
	)
}

export default TabPanels
