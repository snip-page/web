import { nanoid } from 'nanoid'

import Data from './data'
import resolveName from './name'
import useClient from '../../data/use'

const createSnip = async ({ name, text }: Data) => {
	const id = nanoid(10)

	await useClient(client =>
		client.query<Record<string, never>>(
			'INSERT INTO snips (id, name, text) VALUES ($1, $2, $3)',
			[id, resolveName(name), text]
		)
	)

	return id
}

export default createSnip
