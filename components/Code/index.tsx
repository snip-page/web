import { useRef, useEffect } from 'react'
import CodeMirror from 'codemirror'

import Snip from 'lib/snip'
import getMode from 'lib/snip/mode'

import styles from './index.module.scss'

import 'codemirror/mode/javascript/javascript'

export interface CodeProps {
	snip: Snip
}

const Code = ({ snip }: CodeProps) => {
	const host = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!host.current) return

		getMode(snip).then(mode => {
			if (!(host.current && mode)) return

			CodeMirror(host.current, {
				value: snip.text,
				mode,
				theme: 'monokai',
				lineNumbers: true
			})
		})
	}, [snip, host])

	return <div className={styles.root} ref={host} />
}

export default Code
