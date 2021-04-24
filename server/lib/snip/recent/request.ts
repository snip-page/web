import { Request } from 'express'

import SnipMeta from '../meta'

export default interface RecentSnipsRequest extends Request {
	snips: SnipMeta[]
}
