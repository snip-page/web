import { IncomingMessage } from 'http'

import SnipMeta from '../meta'

export default interface RecentSnipsRequest extends IncomingMessage {
	snips: SnipMeta[]
}
