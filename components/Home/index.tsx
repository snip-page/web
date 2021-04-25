import { NextPage } from 'next'

import HomeProps from 'lib/home/props'
import RecentSnipsRequest from 'lib/snip/recent/request'
import getRecentSnips from 'lib/snip/recent'
import Head from 'components/Head'
import Navbar from 'components/Navbar'
import Info from './Info'
import Install from './Install'
import RecentSnips from 'components/Snip/Recent'

import styles from './index.module.scss'

const Home: NextPage<HomeProps> = ({ snips }) => (
	<div className={styles.root}>
		<Head
			title="snip - share your code"
			description="Share your code with one command. Allow others to run your code in an
			online IDE."
			image=""
		/>
		<Navbar />
		<Info />
		<Install />
		<RecentSnips className={styles.snips} snips={snips} />
	</div>
)

Home.getInitialProps = async ({ req }) => ({
	snips: req
		? ((req as unknown) as RecentSnipsRequest).snips
		: await getRecentSnips()
})

export default Home
