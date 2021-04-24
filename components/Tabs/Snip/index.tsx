import Router from 'next/router'
import { Svg } from 'react-optimized-image'

import Snip from 'lib/snip'
import Icon from 'components/Snip/Icon'

import closeIcon from 'images/times.svg'

import styles from './index.module.scss'

const close = () => {
	Router.push('/')
}

export interface SnipTabProps {
	snip: Snip | null
}

const SnipTab = ({ snip }: SnipTabProps) => (
	<span className={styles.root}>
		<Icon className={styles.icon} snip={snip} />
		{snip?.name ?? '404.txt'}
		<Svg className={styles.close} src={closeIcon} onClick={close} />
	</span>
)

export default SnipTab
