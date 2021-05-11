import {
	SetStateAction,
	FormEvent,
	ChangeEvent,
	useRef,
	useState,
	useCallback,
	useEffect
} from 'react'

import Snip from 'lib/snip'
import Modal, { IsModalShowingProps } from 'components/Modal'
import Icon from 'components/Snip/Icon'

import styles from './index.module.scss'

export interface SnipNameProps extends IsModalShowingProps {
	snip: Snip
	setSnip(snip: SetStateAction<Snip> | SetStateAction<Snip | null>): void
}

const SnipName = ({
	snip,
	setSnip,
	isShowing,
	setIsShowing
}: SnipNameProps) => {
	const input = useRef<HTMLInputElement | null>(null)
	const [name, setName] = useState(snip.name)

	const onSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			setSnip((snip: Snip | null) => snip && { ...snip, name })
			setIsShowing(false)
		},
		[name, setSnip, setIsShowing]
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

	useEffect(() => {
		if (!isShowing) return

		setTimeout(() => {
			input.current?.focus()
		}, 100)
	}, [input])

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
				<button className={styles.rename}>rename</button>
			</form>
		</Modal>
	)
}

export default SnipName
