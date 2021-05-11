import { useState, useCallback, useEffect } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import SnipRequest from 'lib/snip/request'
import getSnip from 'lib/snip/get'
import snipEquals from 'lib/snip/equals'
import Props from 'lib/snip/page/props'
import useKey, { OnKeyDown } from 'use/key'
import Head from 'components/Head'
import Tabs from 'components/Tabs'
import HomeTab from 'components/Tabs/Home'
import SnipTab from 'components/Tabs/Snip'
import Embed from './Embed'
import Download from './Download'
import RawCode from 'components/Code/Raw'
import Run from './Run'
import Name from './Name'
import Save from './Save'

import styles from './index.module.scss'

const Code = dynamic(() => import('components/Code'), {
	ssr: false,
	loading: () => <div />
})

const SnipPage: NextPage<Props> = ({ snip: initialSnip }) => {
	const [snip, setSnip] = useState(initialSnip)

	const [isNameModalShowing, setIsNameModalShowing] = useState(false)
	const [isSaveModalShowing, setIsSaveModalShowing] = useState(false)

	const saved = !(snip && initialSnip) || snipEquals(snip, initialSnip)

	const save = useCallback(() => {
		setIsSaveModalShowing(true)
	}, [setIsSaveModalShowing])

	const rename = useCallback(() => {
		setIsNameModalShowing(true)
	}, [setIsNameModalShowing])

	const onKeyDown: OnKeyDown = useCallback(
		event => {
			const { key, metaKey, ctrlKey } = event

			if (
				key === 's' &&
				(navigator.platform.includes('Mac') ? metaKey : ctrlKey)
			) {
				event.preventDefault()
				save()
			}
		},
		[save]
	)

	useKey(onKeyDown)

	useEffect(() => {
		setSnip(initialSnip)
	}, [initialSnip, setSnip])

	return (
		<div className={styles.root}>
			<Head
				title={`${snip?.name ?? '404.txt'} | snip`}
				description={snip ? null : "Uh oh! There's nothing at this URL."}
				image={snip ? `/${snip.id}/preview` : ''}
			/>
			<div className={styles.options}>
				<Tabs>
					<HomeTab saved={saved} />
					<SnipTab snip={snip} saved={saved} onClick={rename} />
				</Tabs>
				<div className={styles.actions}>
					<Embed snip={snip} />
					<Download snip={snip} />
				</div>
			</div>
			{snip ? (
				<>
					<Code className={styles.code} snip={snip} setSnip={setSnip} />
					<RawCode className={styles.rawCode} snip={snip} />
					<Run snip={snip} />
					<Name
						snip={snip}
						setSnip={setSnip}
						isShowing={isNameModalShowing}
						setIsShowing={setIsNameModalShowing}
					/>
					<Save
						snip={snip}
						isShowing={isSaveModalShowing}
						setIsShowing={setIsSaveModalShowing}
					/>
				</>
			) : (
				<p className={styles.notFound}>snip not found</p>
			)}
		</div>
	)
}

SnipPage.getInitialProps = async ({ req, res, query }) => {
	const snip = req
		? (req as unknown as SnipRequest).snip
		: await getSnip(query.id as string)

	if (!snip && res) res.statusCode = 404

	return { snip }
}

export default SnipPage
