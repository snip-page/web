import { NextPage } from 'next'
import Head from 'next/head'

import HomeProps from 'lib/home/props'
import RecentSnipsRequest from 'lib/snip/recent/request'
import getRecentSnips from 'lib/snip/recent'
import Navbar from 'components/Navbar'
import Info from './Info'
import Install from './Install'
import RecentSnips from 'components/Snip/Recent'

import styles from './index.module.scss'

const Home: NextPage<HomeProps> = ({ snips }) => (
	<div className={styles.root}>
		<Head>
			<title key="title">snip</title>
		</Head>
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
