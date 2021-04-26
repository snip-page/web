import cx from 'classnames'

import getIcon, { DEFAULT_ICON } from 'lib/snip/icon'

import 'code-icons/styles.css'

export interface SnipIconProps {
	className?: string
	name: string | null
}

const SnipIcon = ({ className, name }: SnipIconProps) => (
	<span
		className={cx(className, name ? getIcon(name) : DEFAULT_ICON)}
		aria-hidden
	/>
)

export default SnipIcon
