import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Svg } from 'react-optimized-image'

import Snip from 'lib/snip'
import runSnip, { SnipResponse } from 'lib/snip/run'
import getLanguage from 'lib/snip/language'
import formatSize from 'lib/format/size'
import onError from 'lib/error'
import usePersistentState from 'use/state/persistent'
import useKey, { OnKeyDown } from 'use/key'
import Spinner from 'components/Spinner'

import runIcon from 'images/run.svg'
import downIcon from 'images/down.svg'

import styles from './index.module.scss'

const TextEdit = dynamic(() => import('components/Code/Text'), {
	ssr: false,
	loading: () => <div className={styles.value} />
})

export interface RunSnipProps {
	snip: Snip
}

const RunSnip = ({ snip }: RunSnipProps) => {
	const language = getLanguage(snip)

	const [isShowing, setIsShowing] = usePersistentState('isRunSnipShowing', true)
	const [isLoading, setIsLoading] = useState(false)

	const [input, setInput] = useState('')
	const [response, setResponse] = useState<SnipResponse | null>(null)

	const run = useCallback(async () => {
		if (!(isShowing && snip.text)) return

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

			if (
				language &&
				key === 'r' &&
				(/Mac/.test(navigator.platform) ? metaKey : ctrlKey)
			) {
				event.preventDefault()
				run()
			}
		},
		[language, run]
	)

	useKey(onKeyDown)

	return (
		language && (
			<div className={styles.root} aria-hidden={!isShowing}>
				<label className={styles.label}>input</label>
				<div className={styles.options}>
					<label className={styles.label}>output</label>
					{!isLoading && response && (
						<p
							className={styles.feature}
							aria-label="execution time"
							data-balloon-pos="up"
						>
							{response.time}s
						</p>
					)}
					{!isLoading && response && (
						<p
							className={styles.feature}
							aria-label="memory used"
							data-balloon-pos="up"
						>
							{formatSize(response.memory)}
						</p>
					)}
					<button
						className={styles.run}
						disabled={isLoading || !snip.text}
						onClick={run}
					>
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
