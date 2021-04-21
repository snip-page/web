import { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import Props from 'lib/snip/page/props'
import Tabs from 'components/Tabs'
import SnipTab from 'components/Tabs/Snip'

import styles from './index.module.scss'

import 'code-icons/styles.css'

const Code = dynamic(() => import('components/Code'), { ssr: false })

const SnipPage: NextPage<Props> = ({ snip }) => (
	<div className={styles.root}>
		<Head>
			<title key="title">{snip.name}</title>
		</Head>
		<Tabs>
			<SnipTab snip={snip} selected />
		</Tabs>
		<Code className={styles.code} snip={snip} />
	</div>
)

export default SnipPage
