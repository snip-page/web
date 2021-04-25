import { useCallback } from 'react'
import copyText from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import { Svg } from 'react-optimized-image'

import SnipMeta from 'lib/snip/meta'
import { ORIGIN } from 'lib/constants'

import icon from 'images/embed.svg'

import styles from './index.module.scss'

export interface EmbedSnipProps {
	snip: SnipMeta | null
}

const EmbedSnip = ({ snip }: EmbedSnipProps) => {
	const copy = useCallback(() => {
		if (!snip) return

		copyText(
			`<iframe src="${ORIGIN}/${snip.id}" width="800" height="600" style="border:none"></iframe>`
		)

		toast.dark('Copied embed code to clipboard')
	}, [snip])

	return (
		<button className={styles.root} disabled={!snip} onClick={copy}>
			<Svg className={styles.icon} src={icon} />
		</button>
	)
}

export default EmbedSnip
