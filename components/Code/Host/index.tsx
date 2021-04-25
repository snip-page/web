import { forwardRef } from 'react'
import cx from 'classnames'

import styles from './index.module.scss'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css'

export const THEME = 'material-ocean'

export interface CodeHostProps {
	className?: string
}

const CodeHost = forwardRef<HTMLDivElement, CodeHostProps>(
	({ className }, ref) => (
		<div className={cx(styles.root, className)} ref={ref} />
	)
)

export default CodeHost
