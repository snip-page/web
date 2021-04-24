import { NextPage } from 'next'

import HomeProps from 'lib/home/props'
import RecentSnipsRequest from 'lib/snip/recent/request'
import getRecentSnips from 'lib/snip/recent'
import RecentSnips from 'components/Snip/Recent'

const Home: NextPage<HomeProps> = ({ snips }) => (
	<>
		<h1>snip</h1>
		<RecentSnips snips={snips} />
	</>
)

Home.getInitialProps = async ({ req }) => ({
	snips: req
		? ((req as unknown) as RecentSnipsRequest).snips
		: await getRecentSnips()
})

export default Home
