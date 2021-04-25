import cx from 'classnames'

import SnipMeta from 'lib/snip/meta'
import Row from './Row'

import styles from './index.module.scss'

export interface RecentSnipsProps {
	className?: string
	snips: SnipMeta[]
}

const RecentSnips = ({ className, snips }: RecentSnipsProps) => (
	<section className={cx(styles.root, className)}>
		<h3 className={styles.title}>recent snips</h3>
		{snips.map(snip => (
			<Row key={snip.id} snip={snip} />
		))}
	</section>
)

export default RecentSnips
