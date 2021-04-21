import { ReactNode } from 'react'

import styles from './index.module.scss'

export interface TabsProps {
	children?: ReactNode
}

const Tabs = ({ children }: TabsProps) => (
	<nav className={styles.root}>{children}</nav>
)

export default Tabs
