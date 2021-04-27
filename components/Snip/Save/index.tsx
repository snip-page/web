import {
	FormEvent,
	ChangeEvent,
	useRef,
	useState,
	useCallback,
	useEffect
} from 'react'
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

export interface SaveSnipProps extends IsModalShowingProps {
	snip: Snip
}

const SaveSnip = ({ snip, isShowing, setIsShowing }: SaveSnipProps) => {
	const input = useRef<HTMLInputElement | null>(null)

	const [name, setName] = useState(snip.name)
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			try {
				setIsLoading(true)

				const id = await createSnip({ ...snip, name })

				copy(`${ORIGIN}/${id}`)
				toast.dark('Copied link to clipboard')

				await Router.push(`/${id}`)

				setIsShowing(false)
			} catch (error) {
				onError(error)
			} finally {
				setIsLoading(false)
			}
		},
		[snip, name, setIsLoading]
	)

	const onChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setName(event.target.value)
		},
		[setName]
	)

	useEffect(() => {
		if (isShowing) setName(snip.name)
	}, [isShowing, snip.name, setName])

	useEffect(() => {
		input.current?.[isShowing ? 'focus' : 'blur']()
	}, [isShowing, input])

	return (
		<Modal isShowing={isShowing} setIsShowing={setIsShowing}>
			<form className={styles.root} onSubmit={onSubmit}>
				<Icon className={styles.icon} name={name} />
				<input
					ref={input}
					className={styles.name}
					placeholder={snip.name || 'untitled.txt'}
					value={name}
					onChange={onChange}
				/>
				<button className={styles.save} disabled={isLoading}>
					{isLoading ? <Spinner className={styles.spinner} /> : 'save'}
				</button>
			</form>
		</Modal>
	)
}

export default SaveSnip
