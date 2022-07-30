import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AnimatePageProps {
	children: ReactNode | ReactNode[]
}

const AnimatePage = (props: AnimatePageProps) => {
	const { children } = props

	return (
		<motion.div
			initial={{ opacity: 0, x: '100%' }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: '100%' }}
			transition={{ duration: 0.3 }}
		>
			{children}
		</motion.div>
	)
}

export default AnimatePage
