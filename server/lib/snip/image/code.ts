import { highlight, languages } from 'prismjs'
import loadLanguages from 'prismjs/components/'
import _getLanguage from 'filename2prism'

import Snip from '..'

const getLanguage = ({ name }: Snip) => {
	const language: string[] | string | undefined = _getLanguage(name)
	return Array.isArray(language) ? language[0] : language
}

const getCode = (snip: Snip) => {
	const language = getLanguage(snip)
	if (!language) return snip.text

	loadLanguages([language])
	return highlight(snip.text, languages[language], language)
}

export default getCode
