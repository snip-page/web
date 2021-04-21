import { useRef, useEffect } from 'react'
import CodeMirror from 'codemirror'
import cx from 'classnames'

import Snip from 'lib/snip'
import getMode from 'lib/snip/mode'

import styles from './index.module.scss'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/oceanic-next.css'

export interface CodeProps {
	className?: string
	snip: Snip
}

const Code = ({ className, snip }: CodeProps) => {
	const host = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!host.current) return

		getMode(snip).then(mode => {
			if (!(host.current && mode)) return

			CodeMirror(host.current, {
				value: snip.text,
				mode,
				theme: 'oceanic-next',
				lineNumbers: true
			})
		})
	}, [snip, host])

	return <div className={cx(styles.root, className)} ref={host} />
}

export default Code
