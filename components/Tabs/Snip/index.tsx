import { MouseEvent } from 'react'
import Router from 'next/router'
import { Svg } from 'react-optimized-image'

import Snip from 'lib/snip'
import Icon from 'components/Snip/Icon'

import closeIcon from 'images/times.svg'

import styles from './index.module.scss'

const close = (event: MouseEvent<SVGSVGElement>) => {
	event.stopPropagation()
	Router.push('/')
}

export interface SnipTabProps {
	snip: Snip | null
	onClick?(): void
}

const SnipTab = ({ snip, onClick }: SnipTabProps) => (
	<span className={styles.root} onClick={onClick}>
		<Icon className={styles.icon} name={snip && snip.name} />
		{snip ? snip.name || 'untitled.txt' : '404.txt'}
		<Svg className={styles.close} src={closeIcon} onClick={close} />
	</span>
)

export default SnipTab
