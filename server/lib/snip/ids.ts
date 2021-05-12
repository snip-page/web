import useClient from '../data/use'

export interface SnipId {
	id: string
}

const getSnipIds = async () => {
	const { rows: snips } = await useClient(client =>
		client.query<SnipId>(
			`
			SELECT id
			FROM snips
			WHERE public = TRUE
			ORDER BY created DESC
			`
		)
	)

	return snips
}

export default getSnipIds
