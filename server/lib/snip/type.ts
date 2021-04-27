import SnipMeta from './meta'

const HTML_MATCH = /\.html?$/i

const getType = ({ name }: SnipMeta) =>
	HTML_MATCH.test(name) ? 'text/html' : 'text/plain'

export default getType
