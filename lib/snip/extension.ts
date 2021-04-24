import Snip from '.'

const getExtension = ({ name }: Snip) => {
	const dot = name.lastIndexOf('.')
	return ~dot ? name.slice(dot + 1).toLowerCase() : null
}

export default getExtension
