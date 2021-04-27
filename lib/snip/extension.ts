import SnipMeta from './meta'

const getExtension = ({ name }: SnipMeta) => {
	const dot = name.lastIndexOf('.')
	return ~dot ? name.slice(dot + 1).toLowerCase() : null
}

export default getExtension
