import { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import SnipRequest from 'lib/snip/request'
import getSnip from 'lib/snip/get'
import Props from 'lib/snip/page/props'
import Tabs from 'components/Tabs'
import HomeTab from 'components/Tabs/Home'
import SnipTab from 'components/Tabs/Snip'

import styles from './index.module.scss'

import 'code-icons/styles.css'

const Code = dynamic(() => import('components/Code'), { ssr: false })

const SnipPage: NextPage<Props> = ({ snip }) => (
	<div className={styles.root}>
		<Head>
			<title key="title">{snip?.name ?? '404.txt'} | snip</title>
		</Head>
		<Tabs>
			<HomeTab />
			<SnipTab snip={snip} />
		</Tabs>
		{snip ? <Code className={styles.code} snip={snip} /> : 'snip not found'}
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
