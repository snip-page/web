import { Request } from 'express'

import Snip from '.'

export default interface SnipRequest extends Request {
	snip: Snip | null
}
