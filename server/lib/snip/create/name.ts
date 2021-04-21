import HttpError from '../../error/http'
import { NAME_MAX_LENGTH } from '../../constants'

const resolveName = (path: string) => {
	const name = path.slice(path.lastIndexOf('/') + 1)

	if (!name.length) throw new HttpError(400, 'Invalid filename')

	if (name.length > NAME_MAX_LENGTH)
		throw new HttpError(400, 'Filename is too long')

	return name
}

export default resolveName
