import Router from 'next/router'
import { getClassWithColor as getIcon } from 'code-icons'
import { Svg } from 'react-optimized-image'
import cx from 'classnames'

import Snip from 'lib/snip'

import times from 'images/times.svg'

import styles from './index.module.scss'

const close = () => {
	Router.push('/')
}

export interface SnipTabProps {
	snip: Snip
	selected?: boolean
}

const SnipTab = ({ snip, selected = false }: SnipTabProps) => (
	<span className={styles.root} aria-current={selected && 'page'}>
		<span
			className={cx(styles.icon, getIcon(snip.name) ?? 'text-icon')}
			aria-hidden
		/>
		{snip.name}
		<Svg className={styles.close} src={times} onClick={close} />
	</span>
)

export default SnipTab
