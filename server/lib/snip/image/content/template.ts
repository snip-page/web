import { readFile } from 'fs'
import { join } from 'path'
import { TemplateDelegate, compile } from 'handlebars'

import { ROOT } from '../../../constants'

const PATH = join(ROOT, 'templates', 'preview.hbs')

interface TemplateContext {
	font: string
	code: string
}

let template: TemplateDelegate<TemplateContext> | null = null

const getTemplate = async () => {
	if (template) return template

	const document = await new Promise<string>((resolve, reject) => {
		readFile(PATH, 'utf8', (error, data) => {
			error ? reject(error) : resolve(data)
		})
	})

	return (template = compile(document))
}

export default getTemplate
