import React, {
	JSXElementConstructor,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from 'classnames'
import ReactPortal from '@/components/ReactPortal'
import useOnHover from '@/hooks/useOnHover'
import { useWindowSize } from '@/hooks'

interface TooltipProps {
	bgColor?: string
	textColor?: string
	children: ReactElement<any, string | JSXElementConstructor<any>>
	className?: string
	content: undefined | React.ReactNode | React.ReactNode[]
	top?: boolean
	bottom?: boolean
	left?: boolean
	right?: boolean
	space?: number
	style?: React.CSSProperties
}

const variants = {
	initial: { opacity: 0, scale: 0.5 },
	animate: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 1 },
}

const motionProps = {
	variants,
	initial: 'initial',
	animate: 'animate',
	exit: 'exit',
	transition: { duration: 0.3 },
}

function isReactText(children: any) {
	return ['string', 'number'].includes(typeof children)
}

const Tooltip = (props: TooltipProps) => {
	const {
		bgColor = 'bg-black/80',
		textColor = 'text-white',
		children,
		className,
		content,
		top,
		bottom,
		left,
		right,
		space = 16,
		style = {},
	} = props

	let trigger: React.ReactElement
	const windowSize = useWindowSize()
	const triggerRef = useRef<HTMLElement>(null)
	const tooltipRef = useRef<HTMLDivElement>(null)
	const isTriggerHover = useOnHover<HTMLElement>(triggerRef)
	const isTooltipHover = useOnHover<HTMLElement>(tooltipRef)
	const [styleTooltip, setStyleTooltip] = useState<React.CSSProperties>({})

	if (isReactText(children)) {
		trigger = <span ref={triggerRef}>{children}</span>
	} else {
		trigger = React.cloneElement(children, {
			ref: triggerRef,
		})
	}

	const setLeft = (
		trigger: { height: number; width: number; top: number; left: number },
		tooltip: { height: number; width: number; top: number; left: number }
	) => {
		let positionLeft = 0

		const pageScrollX = window.innerWidth + window.scrollX
		const excessWidth = pageScrollX - tooltip.width - space

		if (left) {
			positionLeft = trigger.left + window.scrollX - tooltip.width - space
			positionLeft = Math.max(positionLeft, window.scrollX + space)
		} else if (right) {
			positionLeft = trigger.left + window.scrollX + trigger.width + space
			positionLeft = Math.min(positionLeft, pageScrollX - tooltip.width - space)
		} else {
			positionLeft =
				trigger.left + window.scrollX + trigger.width / 2 - tooltip.width / 2
			positionLeft = Math.max(positionLeft, window.scrollX + space)
			positionLeft = Math.min(positionLeft, excessWidth)
		}
		return positionLeft
	}

	const setTop = (
		trigger: { height: number; width: number; top: number; left: number },
		tooltip: { height: number; width: number; top: number; left: number }
	) => {
		let positionTop = 0
		const pageScrollY = window.innerHeight + window.scrollY
		const excessHeight = pageScrollY - tooltip.height - space

		if (top) {
			positionTop = trigger.top + window.scrollY - tooltip.height - space
			positionTop = Math.max(positionTop, window.scrollY + space)
		} else if (bottom || (!top && !bottom && !left && !right)) {
			positionTop = trigger.top + window.scrollY + trigger.height + space
			positionTop = Math.min(positionTop, pageScrollY - tooltip.height - space)
		} else {
			positionTop =
				trigger.top + window.scrollY + trigger.height / 2 - tooltip.height / 2
			positionTop = Math.max(positionTop, window.scrollY + space)
			positionTop = Math.min(positionTop, excessHeight)
		}

		return positionTop
	}

	const calculatePosition = () => {
		if (triggerRef.current && tooltipRef.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect()
			const triggerDimensions = {
				height: triggerRef.current.offsetHeight,
				width: triggerRef.current.offsetWidth,
				top: triggerRect.top,
				left: triggerRect.left,
			}
			const tooltipRect = tooltipRef.current.getBoundingClientRect()
			const tooltipDimensions = {
				height: tooltipRef.current.offsetHeight,
				width: tooltipRef.current.offsetWidth,
				top: tooltipRect.top,
				left: tooltipRect.left,
			}
			const style: React.CSSProperties = {
				left: setLeft(triggerDimensions, tooltipDimensions),
				top: setTop(triggerDimensions, tooltipDimensions),
			}
			setStyleTooltip(style)
		}
	}

	useEffect(() => {
		if (isTriggerHover || isTooltipHover) {
			calculatePosition()
		}
	}, [isTriggerHover, isTooltipHover, windowSize])

	const tooltipClass = classNames(
		'absolute',
		'px-2',
		'py-1',
		'text-sm',
		'font-medium',
		'rounded',
		bgColor,
		textColor,
		className
	)

	return (
		<>
			{trigger}
			<ReactPortal wrapperId='tooltips-root'>
				<AnimatePresence>
					{(isTriggerHover || isTooltipHover) && (
						<motion.div
							ref={tooltipRef}
							className={tooltipClass}
							style={{ ...style, ...styleTooltip }}
							{...motionProps}
						>
							{content}
						</motion.div>
					)}
				</AnimatePresence>
			</ReactPortal>
		</>
	)
}

export default Tooltip
