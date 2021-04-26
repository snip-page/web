import Link from 'next/link'

import SnipMeta from 'lib/snip/meta'
import Icon from 'components/Snip/Icon'

import styles from './index.module.scss'

export interface RecentSnipProps {
	snip: SnipMeta
}

const RecentSnip = ({ snip }: RecentSnipProps) => (
	<Link href={`/${snip.id}`}>
		<a className={styles.root}>
			<Icon className={styles.icon} name={snip.name} />
			{snip.name}
			<span className={styles.id}>{snip.id}</span>
		</a>
	</Link>
)

export default RecentSnip
