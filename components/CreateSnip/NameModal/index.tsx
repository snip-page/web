import {
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

export interface NameModalProps extends IsModalShowingProps {
	snip: Snip
}

const NameModal = ({ snip, isShowing, setIsShowing }: NameModalProps) => {
	const input = useRef<HTMLInputElement | null>(null)
	const [name, setName] = useState(snip.name)

	const onSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			snip.name = name
			setIsShowing(false)
		},
		[snip, name, setIsShowing]
	)

	const onChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setName(event.target.value)
		},
		[setName]
	)

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
			</form>
		</Modal>
	)
}

export default NameModal
