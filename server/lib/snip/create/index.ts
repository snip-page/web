import { nanoid } from 'nanoid'

import Data from './data'
import resolveName from './name'
import resolveText from './text'
import useClient from '../../data/use'

const createSnip = async ({ name, text, public: isPublic }: Data) => {
	const id = nanoid(10)

	name = resolveName(name)
	text = resolveText(text)

	await useClient(client =>
		client.query<Record<string, never>>(
			`
			INSERT INTO snips (id, name, text, public)
			VALUES ($1, $2, $3, $4)
			`,
			[id, name, text, isPublic]
		)
	)

	return id
}

export default createSnip
