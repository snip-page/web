import cx from 'classnames'

import Snip from 'lib/snip'

import styles from './index.module.scss'

export interface RawCodeProps {
	className?: string
	snip: Snip
}

const RawCode = ({ className, snip }: RawCodeProps) => (
	<noscript className={cx(styles.root, className)}>
		<pre className={styles.code}>{snip.text}</pre>
	</noscript>
)

export default RawCode
