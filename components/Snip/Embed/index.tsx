import { Svg } from 'react-optimized-image'

import SnipMeta from 'lib/snip/meta'
import embedSnip from 'lib/snip/copy'

import icon from 'images/embed.svg'

import styles from './index.module.scss'

export interface EmbedSnipProps {
	snip: SnipMeta | null
}

const EmbedSnip = ({ snip }: EmbedSnipProps) => (
	<button className={styles.root} disabled={!snip} onClick={embedSnip}>
		<Svg className={styles.icon} src={icon} />
	</button>
)

export default EmbedSnip
