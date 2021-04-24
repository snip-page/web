import SnipMeta from 'lib/snip/meta'
import Row from './Row'

import styles from './index.module.scss'

export interface RecentSnipsProps {
	snips: SnipMeta[]
}

const RecentSnips = ({ snips }: RecentSnipsProps) => (
	<section className={styles.root}>
		<h3 className={styles.title}>recent snips</h3>
		{snips.map(snip => (
			<Row key={snip.id} snip={snip} />
		))}
	</section>
)

export default RecentSnips
