import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import SnipRequest from 'lib/snip/request'
import getSnip from 'lib/snip/get'
import Props from 'lib/snip/page/props'
import Head from 'components/Head'
import Tabs from 'components/Tabs'
import HomeTab from 'components/Tabs/Home'
import SnipTab from 'components/Tabs/Snip'
import Embed from './Embed'
import Download from './Download'
import RawCode from 'components/Code/Raw'
import Run from './Run'

import styles from './index.module.scss'

const Code = dynamic(() => import('components/Code'), {
	ssr: false,
	loading: () => <div />
})

const SnipPage: NextPage<Props> = ({ snip }) => (
	<div className={styles.root}>
		<Head
			title={`${snip?.name ?? '404.txt'} | snip`}
			description={snip ? null : "Uh oh! There's nothing at this URL."}
			image={snip ? `/${snip.id}/preview` : ''}
		/>
		<div className={styles.options}>
			<Tabs>
				<HomeTab />
				<SnipTab snip={snip} />
			</Tabs>
			<div className={styles.actions}>
				<Embed snip={snip} />
				<Download snip={snip} />
			</div>
		</div>
		{snip ? (
			<>
				<Code className={styles.code} snip={snip} />
				<RawCode className={styles.rawCode} snip={snip} />
				<Run snip={snip} />
			</>
		) : (
			<p className={styles.notFound}>snip not found</p>
		)}
	</div>
)

SnipPage.getInitialProps = async ({ req, res, query }) => {
	const snip = req
		? ((req as unknown) as SnipRequest).snip
		: await getSnip(query.id as string)

	if (!snip && res) res.statusCode = 404

	return { snip }
}

export default SnipPage
