import { getClassWithColor } from 'code-icons'

export const DEFAULT_ICON = 'text-icon'

const getIcon = (name: string) => getClassWithColor(name) ?? DEFAULT_ICON

export default getIcon
