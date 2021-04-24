import { useEffect } from 'react'

export type OnKeyDown = (event: KeyboardEvent) => void

const useKey = (onKeyDown: OnKeyDown) => {
	useEffect(() => {
		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [onKeyDown])
}

export default useKey
