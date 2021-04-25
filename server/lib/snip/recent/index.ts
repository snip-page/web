import SnipMeta from '../meta'
import useClient from '../../data/use'

const getRecentSnips = async () => {
	const { rows: snips } = await useClient(client =>
		client.query<SnipMeta>(
			`
			SELECT id, name
			FROM snips
			ORDER BY created DESC
			LIMIT 100
			`
		)
	)

	return snips
}

export default getRecentSnips
