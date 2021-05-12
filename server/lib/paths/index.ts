import getSnips from '../snip/ids'

const getPaths = async () => [
	'',
	'/new',
	...(await getSnips()).map(({ id }) => `/${id}`)
]

export default getPaths
