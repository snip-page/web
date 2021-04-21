import Snip from '.'
import HttpError from 'lib/error/http'
import { ORIGIN } from 'lib/constants'

const getSnip = async (id: string) => {
	const response = await fetch(`${ORIGIN}/rooms/${id}`)

	switch (response.status) {
		case 200:
			return (await response.json()) as Snip
		case 404:
			return null
		default:
			throw new HttpError(response.status, await response.text())
	}
}

export default getSnip
