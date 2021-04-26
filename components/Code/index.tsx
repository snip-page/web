import { SetStateAction, useRef, useEffect, useState } from 'react'
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
	const [editor, setEditor] = useState<CodeMirror.Editor | null>(null)

	useEffect(() => {
		if (!host.current) return

		const editor = CodeMirror(host.current, {
			...OPTIONS,
			value: snip.text
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

		setEditor(editor)
	}, [host, setEditor, setSnip])

	useEffect(() => {
		if (!editor) return

		let commit = true

		getMode(snip)
			.then(mode => commit && editor?.setOption('mode', mode))
			.catch(error => commit && onError(error))

		return () => {
			commit = false
		}
	}, [editor, snip.name])

	return <Host className={className} ref={host} />
}

export default Code
