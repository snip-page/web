import { useState, useCallback } from 'react'

import { get, set } from 'lib/storage'
import useIsomorphicLayoutEffect from 'use/layout/effect'

const usePersistentState = <Value>(key: string, initialValue: Value) => {
	const [value, setCurrentValue] = useState(initialValue)

	const setValue: typeof setCurrentValue = useCallback(
		value => {
			setCurrentValue(previous => {
				const current =
					typeof value === 'function'
						? (value as (previous: Value) => Value)(previous)
						: value

				set(key, current)
				return current
			})
		},
		[key, setCurrentValue]
	)

	useIsomorphicLayoutEffect(() => {
		const value = get<Value>(key)
		value === undefined ? set(key, initialValue) : setCurrentValue(value)
	}, [key, initialValue, setCurrentValue])

	return [value, setValue] as const
}

export default usePersistentState
