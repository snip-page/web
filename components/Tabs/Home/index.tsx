import { MouseEvent, useState, useCallback } from 'react'
import Link from 'next/link'
import { Svg } from 'react-optimized-image'

import Unsaved from './Unsaved'

import icon from 'images/home.svg'

import styles from './index.module.scss'

export interface HomeTabProps {
	saved?: boolean
}

const HomeTab = ({ saved = true }: HomeTabProps) => {
	const [isUnsavedModalShowing, setIsUnsavedModalShowing] = useState(false)

	const onClick = useCallback(
		(event: MouseEvent<HTMLAnchorElement>) => {
			if (saved) return

			event.preventDefault()
			setIsUnsavedModalShowing(true)
		},
		[saved, setIsUnsavedModalShowing]
	)

	return (
		<>
			<Link href="/">
				<a className={styles.root} onClick={onClick}>
					<Svg className={styles.icon} src={icon} />
					snip.page
				</a>
			</Link>
			<Unsaved
				isShowing={isUnsavedModalShowing}
				setIsShowing={setIsUnsavedModalShowing}
			/>
		</>
	)
}

export default HomeTab
