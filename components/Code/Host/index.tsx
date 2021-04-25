import { forwardRef } from 'react'
import CodeMirror from 'codemirror'
import cx from 'classnames'

import styles from './index.module.scss'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css'

export const OPTIONS: CodeMirror.EditorConfiguration = {
	theme: 'material-ocean',
	indentUnit: 4,
	indentWithTabs: true,
	lineWrapping: true,
	lineNumbers: true
}

export interface CodeHostProps {
	className?: string
}

const CodeHost = forwardRef<HTMLDivElement, CodeHostProps>(
	({ className }, ref) => (
		<div className={cx(styles.root, className)} ref={ref} />
	)
)

export default CodeHost
