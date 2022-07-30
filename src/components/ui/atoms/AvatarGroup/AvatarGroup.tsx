import React from 'react'
import classNames from 'classnames'

interface AvatarGroupProps {
	children?: undefined | React.ReactNode | React.ReactNode[]
	className?: string
	style?: React.CSSProperties
	vertical?: boolean
}

const AvatarGroup = (props: AvatarGroupProps) => {
	const { children, className, style, vertical } = props

	const avatarGroupClass = classNames('avatar-group', className, {
		'flex-col': vertical,
		'-space-y-6': vertical,
		'-space-x-6': !vertical,
	})
	return (
		<div className={avatarGroupClass} style={style}>
			{children}
		</div>
	)
}

export default AvatarGroup
