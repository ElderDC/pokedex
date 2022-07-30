import React from 'react'

interface TabPanelProps {
	className?: string
	children: React.ReactNode
	value: string | number
}

const TabPanel = (props: TabPanelProps) => {
	const { className, children, value } = props

	return <div className={className}>{children}</div>
}

export default TabPanel
