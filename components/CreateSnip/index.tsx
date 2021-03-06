import { useState, useCallback } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import emptySnip from 'lib/snip/empty'
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

const CreateSnip: NextPage = () => {
	const [snip, setSnip] = useState(emptySnip)

	const [isNameModalShowing, setIsNameModalShowing] = useState(true)
	const [isSaveModalShowing, setIsSaveModalShowing] = useState(false)

	const saved = snipEquals(snip, emptySnip)

	const rename = useCallback(() => {
		setIsNameModalShowing(true)
	}, [setIsNameModalShowing])

	const save = useCallback(() => {
		setIsSaveModalShowing(true)
	}, [setIsSaveModalShowing])

	const onKeyDown: OnKeyDown = useCallback(
		event => {
			const { key, metaKey, ctrlKey } = event
			if (!(navigator.platform.includes('Mac') ? metaKey : ctrlKey)) return

			switch (key) {
				case 'e':
					event.preventDefault()
					rename()
					break
				case 's':
					event.preventDefault()
					save()
					break
			}
		},
		[rename, save]
	)

	useKey(onKeyDown)

	return (
		<div className={styles.root}>
			<Head title="new | snip" description="Create a new snip" image="" />
			<div className={styles.options}>
				<Tabs>
					<HomeTab saved={saved} />
					<SnipTab snip={snip} saved={saved} onClick={rename} />
				</Tabs>
				<div className={styles.actions}>
					<Download snip={snip} />
				</div>
			</div>
			<Code className={styles.code} snip={snip} setSnip={setSnip} />
			<Run snip={snip} persist={false} />
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
