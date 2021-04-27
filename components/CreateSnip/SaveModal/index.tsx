import { FormEvent, useState, useCallback } from 'react'
import Router from 'next/router'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'

import Snip from 'lib/snip'
import createSnip from 'lib/snip/create'
import onError from 'lib/error'
import { ORIGIN } from 'lib/constants'
import Modal, { IsModalShowingProps } from 'components/Modal'
import Icon from 'components/Snip/Icon'
import Spinner from 'components/Spinner'

import styles from './index.module.scss'

export interface SaveModalProps extends IsModalShowingProps {
	snip: Snip
}

const SaveModal = ({ snip, isShowing, setIsShowing }: SaveModalProps) => {
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			try {
				setIsLoading(true)

				const id = await createSnip(snip)
				Router.push(`/${id}`)

				copy(`${ORIGIN}/${id}`)
				toast.dark('Copied link to clipboard')
			} catch (error) {
				setIsLoading(false)
				onError(error)
			}
		},
		[snip, setIsLoading]
	)

	return (
		<Modal isShowing={isShowing} setIsShowing={setIsShowing}>
			<form className={styles.root} onSubmit={onSubmit}>
				<Icon className={styles.icon} name={snip.name} />
				<p className={styles.name}>{snip.name || 'untitled.txt'}</p>
				<button className={styles.save} disabled={isLoading}>
					{isLoading ? <Spinner className={styles.spinner} /> : 'save'}
				</button>
			</form>
		</Modal>
	)
}

export default SaveModal
