import { NextPage } from 'next'

import HomeProps from 'lib/home/props'
import RecentSnipsRequest from 'lib/snip/recent/request'
import getRecentSnips from 'lib/snip/recent'

const Home: NextPage<HomeProps> = ({ snips }) => (
	<div>{JSON.stringify(snips)}</div>
)

Home.getInitialProps = async ({ req }) => ({
	snips: req
		? ((req as unknown) as RecentSnipsRequest).snips
		: await getRecentSnips()
})

export default Home
