import { useState, useCallback } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Snip from 'lib/snip'
import Head from 'components/Head'
import Tabs from 'components/Tabs'
import HomeTab from 'components/Tabs/Home'
import SnipTab from 'components/Tabs/Snip'
import Download from 'components/Snip/Download'
import Run from 'components/Snip/Run'
import NameModal from './NameModal'

import styles from './index.module.scss'

const Code = dynamic(() => import('components/Code'), {
	ssr: false,
	loading: () => <div />
})

const EMPTY_SNIP: Snip = { id: '', name: '', text: '' }

const CreateSnip: NextPage = () => {
	const [snip, setSnip] = useState(EMPTY_SNIP)
	const [isNameModalShowing, setIsNameModalShowing] = useState(true)

	const rename = useCallback(() => {
		setIsNameModalShowing(true)
	}, [setIsNameModalShowing])

	return (
		<div className={styles.root}>
			<Head title="new | snip" description="Create a new snip" image="" />
			<div className={styles.options}>
				<Tabs>
					<HomeTab />
					<SnipTab snip={snip} onClick={rename} />
				</Tabs>
				<div className={styles.actions}>
					<Download snip={snip} />
				</div>
			</div>
			<Code className={styles.code} snip={snip} setSnip={setSnip} />
			<Run snip={snip} />
			<NameModal
				snip={snip}
				setSnip={setSnip}
				isShowing={isNameModalShowing}
				setIsShowing={setIsNameModalShowing}
			/>
		</div>
	)
}

export default CreateSnip
