import Snip from '.'
import useClient from '../data/use'

const getSnip = async (id: string) => {
	const { rows: snips } = await useClient(client =>
		client.query<Snip>(
			`
			SELECT id, name, text
			FROM snips
			WHERE id = $1
			`,
			[id]
		)
	)

	return snips[0] ?? null
}

export default getSnip
