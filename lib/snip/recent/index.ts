import SnipMeta from '../meta'
import HttpError from 'lib/error/http'
import { ORIGIN } from 'lib/constants'

const getRecentSnips = async () => {
	const response = await fetch(`${ORIGIN}/snips`)

	switch (response.status) {
		case 200:
			return (await response.json()) as SnipMeta[]
		default:
			throw new HttpError(response.status, await response.text())
	}
}

export default getRecentSnips
