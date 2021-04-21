import HttpError from '../../error/http'
import { TEXT_MAX_LENGTH } from '../../constants'

const resolveText = (text: string) => {
	if (text.length > TEXT_MAX_LENGTH) throw new HttpError(400, 'File is too big')

	return text
}

export default resolveText
