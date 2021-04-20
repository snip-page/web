import CodeMirror from 'codemirror'

import Snip from '.'

import 'codemirror/mode/meta'

interface Mime {
	mode: string
}

interface GetMode {
	findModeByFileName(filename: string): Mime | undefined
}

const getMode = async (snip: Snip) => {
	const code = (CodeMirror as unknown) as GetMode
	const mode = code.findModeByFileName(snip.name)?.mode

	if (!mode) return null
	if (mode !== 'null') await import(`codemirror/mode/${mode}/${mode}.js`)

	return mode
}

export default getMode
