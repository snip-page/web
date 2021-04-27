import { MouseEvent } from 'react'
import Router from 'next/router'
import { Svg } from 'react-optimized-image'

import Snip from 'lib/snip'
import Icon from 'components/Snip/Icon'

import closeIcon from 'images/times.svg'
import unsavedIcon from 'images/circle.svg'

import styles from './index.module.scss'

const close = async (event: MouseEvent<SVGSVGElement>) => {
	event.stopPropagation()
	await Router.push('/')
}

export interface SnipTabProps {
	snip: Snip | null
	saved?: boolean
	onClick?(): void
}

const SnipTab = ({ snip, saved = true, onClick }: SnipTabProps) => (
	<span className={styles.root} onClick={onClick}>
		<Icon className={styles.icon} name={snip && snip.name} />
		{snip ? snip.name || 'untitled.txt' : '404.txt'}
		{saved ? (
			<Svg className={styles.close} src={closeIcon} onClick={close} />
		) : (
			<Svg className={styles.close} src={unsavedIcon} onClick={close} />
		)}
	</span>
)

export default SnipTab
