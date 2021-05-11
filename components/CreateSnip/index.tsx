import { useState, useCallback } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Snip from 'lib/snip'
import snipEquals from 'lib/snip/equals'
import useKey, { OnKeyDown } from 'use/key'
import Head from 'components/Head'
import Tabs from 'components/Tabs'
import HomeTab from 'components/Tabs/Home'
import SnipTab from 'components/Tabs/Snip'
import Download from 'components/Snip/Download'
import Run from 'components/Snip/Run'
import Name from 'components/Snip/Name'
import Save from 'components/Snip/Save'

import styles from './index.module.scss'

const Code = dynamic(() => import('components/Code'), {
	ssr: false,
	loading: () => <div />
})

const EMPTY_SNIP: Snip = { id: '', name: '', text: '' }

const CreateSnip: NextPage = () => {
	const [snip, setSnip] = useState(EMPTY_SNIP)

	const [isNameModalShowing, setIsNameModalShowing] = useState(true)
	const [isSaveModalShowing, setIsSaveModalShowing] = useState(false)

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

	return (
		<div className={styles.root}>
			<Head title="new | snip" description="Create a new snip" image="" />
			<div className={styles.options}>
				<Tabs>
					<HomeTab />
					<SnipTab
						snip={snip}
						saved={snipEquals(snip, EMPTY_SNIP)}
						onClick={rename}
					/>
				</Tabs>
				<div className={styles.actions}>
					<Download snip={snip} />
				</div>
			</div>
			<Code className={styles.code} snip={snip} setSnip={setSnip} />
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
		</div>
	)
}

export default CreateSnip
