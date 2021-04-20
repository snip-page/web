import { IncomingMessage } from 'http'

import Snip from '.'

export default interface SnipRequest extends IncomingMessage {
	snip: Snip | null
}
