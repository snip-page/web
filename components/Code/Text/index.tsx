import { useRef, useEffect } from 'react'
import CodeMirror from 'codemirror'

import Host, { OPTIONS } from '../Host'

export interface TextEditProps {
	className?: string
	value: string
	setValue?(value: string): void
}

const TextEdit = ({ className, value, setValue }: TextEditProps) => {
	const host = useRef<HTMLDivElement | null>(null)
	const editor = useRef<CodeMirror.Editor | null>(null)

	useEffect(() => {
		if (!host.current) return

		editor.current = CodeMirror(host.current, {
			...OPTIONS,
			value,
			readOnly: !setValue
		})

		if (setValue)
			editor.current.on('change', () => {
				if (!editor.current) return
				setValue(editor.current.getValue())
			})

		setTimeout(() => {
			editor.current?.refresh()
		}, 1000)
	}, [setValue, host, editor])

	useEffect(() => {
		if (!setValue) editor.current?.setValue(value)
	}, [value, setValue, editor])

	return <Host className={className} ref={host} />
}

export default TextEdit
