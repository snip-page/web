import { getClassWithColor } from 'code-icons'

import SnipMeta from './meta'

export const DEFAULT_ICON = 'text-icon'

const getIcon = (snip: SnipMeta) => getClassWithColor(snip.name) ?? DEFAULT_ICON

export default getIcon
