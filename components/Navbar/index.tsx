import Link from 'next/link'
import { Svg } from 'react-optimized-image'

import createIcon from 'images/plus.svg'

import styles from './index.module.scss'

const Navbar = () => (
	<div className={styles.root}>
		<nav className={styles.content}>
			<h1 className={styles.title}>snip</h1>
			<Link href="/new">
				<a className={styles.create}>
					<Svg className={styles.createIcon} src={createIcon} />
					new
				</a>
			</Link>
		</nav>
	</div>
)

export default Navbar
