import { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import Props from 'lib/snip/page/props'

const Code = dynamic(() => import('components/Code'), { ssr: false })

const SnipPage: NextPage<Props> = ({ snip }) => (
	<>
		<Head>
			<title key="title">{snip.name}</title>
		</Head>
		<h1>{snip.name}</h1>
		<Code snip={snip} />
	</>
)

export default SnipPage
