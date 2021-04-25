import { NextPage } from 'next'

import Head from 'components/Head'
import Tabs from 'components/Tabs'
import HomeTab from 'components/Tabs/Home'
import SnipTab from 'components/Tabs/Snip'

import styles from './index.module.scss'

const NotFound: NextPage = () => (
	<div className={styles.root}>
		<Head
			title="404.txt | snip"
			description="Uh oh! There's nothing at this URL."
			image=""
		/>
		<Tabs>
			<HomeTab />
			<SnipTab snip={null} />
		</Tabs>
		<p className={styles.message}>not found</p>
	</div>
)

export default NotFound
