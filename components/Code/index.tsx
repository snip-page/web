import { useRef, useEffect } from 'react'
import CodeMirror from 'codemirror'

import Snip from 'lib/snip'
import getMode from 'lib/snip/mode'
import onError from 'lib/error'
import Host from './Host'

export interface CodeProps {
	className?: string
	snip: Snip
}

const Code = ({ className, snip }: CodeProps) => {
	const host = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!host.current) return

		getMode(snip)
			.then(mode => {
				if (!(host.current && mode)) return

				const editor = CodeMirror(host.current, {
					value: snip.text,
					mode,
					theme: 'oceanic-next',
					lineWrapping: true,
					lineNumbers: true
				})

				editor.on('change', () => {
					snip.text = editor.getValue()
				})

				setTimeout(() => {
					editor.refresh()
				}, 1000)
			})
			.catch(onError)
	}, [snip, host])

	return <Host className={className} ref={host} />
}

export default Code
