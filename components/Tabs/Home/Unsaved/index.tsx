import { FormEvent } from 'react'
import Router from 'next/router'

import Modal, { IsModalShowingProps } from 'components/Modal'

import styles from './index.module.scss'

const onSubmit = (event: FormEvent<HTMLFormElement>) => {
	event.preventDefault()
	Router.push('/')
}

export type UnsavedSnipProps = IsModalShowingProps

const UnsavedSnip = ({ isShowing, setIsShowing }: UnsavedSnipProps) => (
	<Modal isShowing={isShowing} setIsShowing={setIsShowing}>
		<form className={styles.root} onSubmit={onSubmit}>
			<p className={styles.message}>you have unsaved changes</p>
			<button className={styles.confirm}>discard</button>
		</form>
	</Modal>
)

export default UnsavedSnip
