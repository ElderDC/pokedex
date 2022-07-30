import React from 'react'
import classNames from 'classnames'

type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end'

type TextSize =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'subtitle1'
	| 'subtitle2'
	| 'body1'
	| 'body2'
	| 'caption'
	| 'button'
	| 'overline'

type TextWeight =
	| 'extralight'
	| 'light'
	| 'normal'
	| 'medium'
	| 'semibold'
	| 'bold'
	| 'extrabold'
	| 'black'

type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase'

const alignOptions: Record<TextAlign, string> = {
	left: 'text-left',
	center: 'text-center',
	right: 'text-right',
	justify: 'text-justify',
	start: 'text-start',
	end: 'text-end',
}

const sizeOptions: Record<TextSize, string> = {
	h1: 'text-9xl',
	h2: 'text-8xl',
	h3: 'text-6xl',
	h4: 'text-5xl',
	h5: 'text-4xl',
	h6: 'text-2xl',
	subtitle1: 'text-xl',
	subtitle2: 'text-lg',
	body1: 'text-base',
	body2: 'text-sm',
	button: 'text-sm',
	caption: 'text-xs',
	overline: 'text-xs',
}

const weightOptions: Record<TextWeight, string> = {
	extralight: 'font-extralight',
	light: 'font-light',
	normal: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
	extrabold: 'font-extrabold',
	black: 'font-black',
}

const transformOptions: Record<TextTransform, string> = {
	none: '',
	capitalize: 'capitalize',
	uppercase: 'uppercase',
	lowercase: 'lowercase',
}

interface TextProps {
	align?: TextAlign
	children: undefined | React.ReactNode | React.ReactNode[]
	className?: string
	size?: TextSize
	style?: React.CSSProperties
	transform?: TextTransform
	weight?: TextWeight
}

const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
	props,
	ref
) {
	const { align, className, children, style, size, transform, weight } = props

	const getTextAlign = (align?: TextAlign): string => {
		if (!align) return ''
		return alignOptions[align]
	}
	const getTextSize = (size?: TextSize): string => {
		if (!size) return ''
		return sizeOptions[size]
	}
	const getTextTransform = (transform?: TextTransform): string => {
		if (!transform) return ''
		return transformOptions[transform]
	}
	const getTextWeight = (weight?: TextWeight): string => {
		if (!weight) return ''
		return weightOptions[weight]
	}

	const textClass = classNames(
		className,
		getTextAlign(align),
		getTextSize(size),
		getTextWeight(weight),
		getTextTransform(transform)
	)

	return (
		<span className={textClass} style={style} ref={ref}>
			{children}
		</span>
	)
})

export default Text
