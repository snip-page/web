import { useState, useCallback } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Snip from 'lib/snip'
import useKey, { OnKeyDown } from 'use/key'
import Head from 'components/Head'
import Tabs from 'components/Tabs'
import HomeTab from 'components/Tabs/Home'
import SnipTab from 'components/Tabs/Snip'
import Download from 'components/Snip/Download'
import Run from 'components/Snip/Run'
import NameModal from './NameModal'
import SaveModal from './SaveModal'

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

			if (key === 's' && (/Mac/.test(navigator.platform) ? metaKey : ctrlKey)) {
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
						saved={snip.text === EMPTY_SNIP.text}
						onClick={rename}
					/>
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
			<SaveModal
				snip={snip}
				isShowing={isSaveModalShowing}
				setIsShowing={setIsSaveModalShowing}
			/>
		</div>
	)
}

export default CreateSnip
