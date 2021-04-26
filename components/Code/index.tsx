import { SetStateAction, useRef, useEffect } from 'react'
import CodeMirror from 'codemirror'

import Snip from 'lib/snip'
import getMode from 'lib/snip/mode'
import onError from 'lib/error'
import Host, { OPTIONS } from './Host'

export interface CodeProps {
	className?: string
	snip: Snip
	setSnip(snip: SetStateAction<Snip> | SetStateAction<Snip | null>): void
}

const Code = ({ className, snip, setSnip }: CodeProps) => {
	const host = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!host.current) return

		getMode(snip)
			.then(mode => {
				if (!host.current) return

				const editor = CodeMirror(host.current, {
					...OPTIONS,
					value: snip.text,
					mode
				})

				editor.on('change', () => {
					setSnip(
						(snip: Snip | null) =>
							snip && {
								...snip,
								text: editor.getValue()
							}
					)
				})

				setTimeout(() => {
					editor.refresh()
				}, 1000)
			})
			.catch(onError)
	}, [host, setSnip])

	return <Host className={className} ref={host} />
}

export default Code
