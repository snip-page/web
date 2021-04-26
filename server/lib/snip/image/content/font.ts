import { readFile } from 'fs'
import { join } from 'path'

import { ROOT } from '../../../constants'

const PATH = join(ROOT, 'fonts', 'menlo.ttf')

let font: string | null = null

const getFont = async () => {
	if (font) return font

	const data = await new Promise<string>((resolve, reject) => {
		readFile(PATH, 'base64', (error, data) => {
			error ? reject(error) : resolve(data)
		})
	})

	return (font = data)
}

export default getFont
