import CodeMirror from 'codemirror'

import SnipMeta from './meta'

import 'codemirror/mode/meta'

interface Type {
	mime: string
	mode: string
}

interface GetMode {
	findModeByFileName(filename: string): Type | undefined
}

const code = (CodeMirror as unknown) as GetMode

const getMode = async ({ name }: SnipMeta) => {
	const type = code.findModeByFileName(name)
	if (!type) return null

	const { mime, mode } = type
	if (mode !== 'null') await import(`codemirror/mode/${mode}/${mode}.js`)

	return mime
}

export default getMode
