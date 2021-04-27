import Snip from '.'
import HttpError from 'lib/error/http'
import { ORIGIN } from 'lib/constants'

const createSnip = async ({ name, text }: Snip) => {
	const response = await fetch(`${ORIGIN}/snips`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({
			name: name || 'untitled.txt',
			text
		})
	})

	if (response.status !== 200)
		throw new HttpError(response.status, await response.text())

	return await response.text()
}

export default createSnip
