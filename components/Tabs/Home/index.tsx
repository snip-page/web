import Link from 'next/link'
import { Svg } from 'react-optimized-image'

import home from 'images/home.svg'

import styles from './index.module.scss'

const HomeTab = () => (
	<Link href="/">
		<a className={styles.root}>
			<Svg className={styles.icon} src={home} />
			home
		</a>
	</Link>
)

export default HomeTab
