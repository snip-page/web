export const get = <Value>(key: string) => {
	try {
		const value = localStorage.getItem(key)
		if (value !== null) return JSON.parse(value) as Value
	} catch (error) {
		console.error(error)
	}
}

export const set = <Value>(key: string, value: Value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		console.error(error)
	}
}
