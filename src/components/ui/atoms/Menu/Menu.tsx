import React, {
	JSXElementConstructor,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from 'classnames'
import ReactPortal from 'src/components/ReactPortal'
import { useOnClickOutside, useOnHover, useWindowSize } from 'src/hooks'

const noop = (): false => {
	return false
}

type Handler = () => void

interface ElementPosition {
	height: number
	width: number
	top: number
	left: number
}

interface MenuProps {
	children: ReactElement<any, string | JSXElementConstructor<any>>
	className?: string
	trigger: ReactElement<any, string | JSXElementConstructor<any>>
	top?: boolean
	bottom?: boolean
	left?: boolean
	right?: boolean
	offsetX?: boolean
	offsetY?: boolean
	space?: number
	style?: React.CSSProperties
	openOnHover?: boolean
	closeOnContentClick?: boolean
	value?: boolean
	onClose?: Handler
	onOpen?: Handler
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

function isReactText(trigger: any) {
	return ['string', 'number'].includes(typeof trigger)
}

const Menu = (props: MenuProps) => {
	const {
		children,
		className,
		trigger,
		top,
		bottom,
		left,
		right,
		offsetX,
		offsetY,
		space = 16,
		style = {},
		openOnHover = false,
		closeOnContentClick = false,
		value = false,
		onClose = noop,
		onOpen = noop,
	} = props

	const handleClose = (): void => {
		onClose()
	}
	const handleOpen = (): void => {
		onOpen()
	}

	let triggerElement: React.ReactElement
	let isHoverTrigger: boolean = false
	let isHoverMenu: boolean = false
	const elements = []
	const windowSize = useWindowSize()
	const triggerRef = useRef<HTMLButtonElement>(null)
	const menuRef = useRef<HTMLDivElement>(null)
	const [internalValue, setInternalValue] = useState<boolean>(value)
	const [styleMenu, setStyleMenu] = useState<React.CSSProperties>({})

	if (openOnHover) {
		isHoverTrigger = useOnHover<HTMLElement>(triggerRef)
		isHoverMenu = useOnHover<HTMLElement>(menuRef)
	}

	const openOnClick = () => {
		if (openOnHover) {
			return
		}
		setInternalValue((prevValue) => !prevValue)
	}

	if (isReactText(trigger)) {
		triggerElement = (
			<button ref={triggerRef} onClick={() => openOnClick()}>
				{trigger}
			</button>
		)
	} else {
		triggerElement = React.cloneElement(trigger, {
			ref: triggerRef,
			onClick: () => {
				openOnClick()
				trigger.props?.onClick?.()
			},
		})
	}

	const setLeft = (trigger: ElementPosition, menu: ElementPosition) => {
		let positionLeft = 0
		const pageScrollX = window.innerWidth + window.scrollX
		const excessWidth = pageScrollX - menu.width - space
		const offsetLeft = offsetX ? -space : trigger.width
		const offsetRigth = offsetX ? trigger.width + space : 0

		if (left) {
			positionLeft = trigger.left + window.scrollX - menu.width + offsetLeft
			positionLeft = Math.max(positionLeft, window.scrollX + space)
			positionLeft = Math.min(positionLeft, excessWidth)
		} else if (right) {
			positionLeft = trigger.left + window.scrollX + offsetRigth
			positionLeft = Math.min(positionLeft, pageScrollX - menu.width - space)
			positionLeft = Math.max(positionLeft, space)
		} else {
			positionLeft =
				trigger.left + window.scrollX + trigger.width / 2 - menu.width / 2
			positionLeft = Math.max(positionLeft, window.scrollX + space)
			positionLeft = Math.min(positionLeft, excessWidth)
		}

		return positionLeft
	}

	const setTop = (trigger: ElementPosition, menu: ElementPosition) => {
		let positionTop = 0
		const pageScrollY = window.innerHeight + window.scrollY
		const excessHeight = pageScrollY - menu.height - space
		const offsetTop = offsetY ? -space : trigger.height
		const offsetBottom = offsetY ? trigger.height + space : 0

		if (top) {
			positionTop = trigger.top + window.scrollY - menu.height + offsetTop
			positionTop = Math.max(positionTop, window.scrollY + space)
			positionTop = Math.min(positionTop, excessHeight)
		} else if (bottom) {
			positionTop = trigger.top + window.scrollY + offsetBottom
			positionTop = Math.min(positionTop, pageScrollY - menu.height - space)
			positionTop = Math.max(positionTop, space)
		} else {
			positionTop =
				trigger.top + window.scrollY + trigger.height / 2 - menu.height / 2
			positionTop = Math.max(positionTop, window.scrollY + space)
			positionTop = Math.min(positionTop, excessHeight)
		}

		return positionTop
	}

	const calculatePosition = () => {
		if (triggerRef.current && menuRef.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect()
			const triggerDimensions = {
				height: triggerRef.current.offsetHeight,
				width: triggerRef.current.offsetWidth,
				top: triggerRect.top,
				left: triggerRect.left,
			}
			const menuRect = menuRef.current.getBoundingClientRect()
			const menuDimensions = {
				height: menuRef.current.offsetHeight,
				width: menuRef.current.offsetWidth,
				top: menuRect.top,
				left: menuRect.left,
			}

			const style: React.CSSProperties = {
				left: setLeft(triggerDimensions, menuDimensions),
				top: setTop(triggerDimensions, menuDimensions),
			}
			setStyleMenu(style)
		}
	}

	useEffect(() => {
		setInternalValue(value)
	}, [value])

	useEffect(() => {
		if (internalValue) {
			calculatePosition()
			handleOpen()
		} else {
			handleClose()
		}
	}, [internalValue, windowSize])

	elements.push(triggerRef)

	if (!closeOnContentClick) {
		elements.push(menuRef)
	}

	useOnClickOutside<HTMLButtonElement | HTMLDivElement>(elements, () =>
		setInternalValue(false)
	)

	const menuClass = classNames('absolute', className)

	return (
		<>
			{triggerElement}
			<ReactPortal wrapperId='menus-root'>
				<AnimatePresence>
					{(internalValue || isHoverTrigger || isHoverMenu) && (
						<motion.div
							ref={menuRef}
							className={menuClass}
							style={{ ...style, ...styleMenu }}
							{...motionProps}
						>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</ReactPortal>
		</>
	)
}

export default Menu
