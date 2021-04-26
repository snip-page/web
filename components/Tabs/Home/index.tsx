import Link from 'next/link'
import { Svg } from 'react-optimized-image'

import icon from 'images/home.svg'

import styles from './index.module.scss'

const HomeTab = () => (
	<Link href="/">
		<a className={styles.root}>
			<Svg className={styles.icon} src={icon} />
			snip.page
		</a>
	</Link>
)

export default HomeTab
