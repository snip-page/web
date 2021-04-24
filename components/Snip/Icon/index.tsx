import cx from 'classnames'

import SnipMeta from 'lib/snip/meta'
import getIcon, { DEFAULT_ICON } from 'lib/snip/icon'

import 'code-icons/styles.css'

export interface SnipIconProps {
	className?: string
	snip: SnipMeta | null
}

const SnipIcon = ({ className, snip }: SnipIconProps) => (
	<span
		className={cx(className, snip ? getIcon(snip) : DEFAULT_ICON)}
		aria-hidden
	/>
)

export default SnipIcon
