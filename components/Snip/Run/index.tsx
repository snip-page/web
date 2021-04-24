import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Svg } from 'react-optimized-image'

import Snip from 'lib/snip'
import runSnip, { SnipResponse } from 'lib/snip/run'
import onError from 'lib/error'
import usePersistentState from 'use/state/persistent'
import useKey, { OnKeyDown } from 'use/key'
import Spinner from 'components/Spinner'

import runIcon from 'images/run.svg'
import downIcon from 'images/down.svg'

import styles from './index.module.scss'
import getLanguage from 'lib/snip/language'

const TextEdit = dynamic(() => import('components/Code/Text'), {
	ssr: false,
	loading: () => <div className={styles.value} />
})

export interface RunSnipProps {
	snip: Snip
}

const RunSnip = ({ snip }: RunSnipProps) => {
	const [isShowing, setIsShowing] = usePersistentState('isRunSnipShowing', true)
	const [isLoading, setIsLoading] = useState(false)

	const [input, setInput] = useState('')
	const [response, setResponse] = useState<SnipResponse | null>(null)

	const run = useCallback(async () => {
		if (!isShowing) return

		try {
			setIsLoading(true)
			setResponse(await runSnip(snip, input))
		} catch (error) {
			onError(error)
		} finally {
			setIsLoading(false)
		}
	}, [snip, isShowing, input, setIsLoading, setResponse])

	const toggle = useCallback(() => {
		setIsShowing(isShowing => !isShowing)
	}, [setIsShowing])

	const onKeyDown: OnKeyDown = useCallback(
		event => {
			const { key, metaKey, ctrlKey } = event

			if (key === 'r' && (/Mac/.test(navigator.platform) ? metaKey : ctrlKey)) {
				event.preventDefault()
				run()
			}
		},
		[run]
	)

	useKey(onKeyDown)

	return (
		getLanguage(snip) && (
			<div className={styles.root} aria-hidden={!isShowing}>
				<label className={styles.label}>input</label>
				<div className={styles.options}>
					<label className={styles.label}>output</label>
					<button className={styles.run} disabled={isLoading} onClick={run}>
						{isLoading ? (
							<Spinner className={styles.spinner} />
						) : (
							<Svg className={styles.runIcon} src={runIcon} />
						)}
					</button>
					<button className={styles.toggle} onClick={toggle}>
						<Svg className={styles.toggleIcon} src={downIcon} />
					</button>
				</div>
				<TextEdit className={styles.value} value={input} setValue={setInput} />
				<TextEdit className={styles.value} value={response?.stdout ?? ''} />
			</div>
		)
	)
}

export default RunSnip
