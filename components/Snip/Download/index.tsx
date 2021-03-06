import { useCallback } from 'react'
import { saveAs } from 'file-saver'
import { Svg } from 'react-optimized-image'

import Snip from 'lib/snip'

import icon from 'images/download.svg'

import styles from './index.module.scss'

export interface DownloadSnip {
	snip: Snip | null
}

const DownloadSnip = ({ snip }: DownloadSnip) => {
	const download = useCallback(() => {
		if (!snip) return

		saveAs(
			new Blob([snip.text], { type: 'text/plain; charset=utf-8' }),
			snip.name
		)
	}, [snip])

	return (
		<button className={styles.root} disabled={!snip} onClick={download}>
			<Svg className={styles.icon} src={icon} />
		</button>
	)
}

export default DownloadSnip
