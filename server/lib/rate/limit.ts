import _rateLimit from 'express-rate-limit'

const rateLimit = (minutes: number, limit: number) =>
	_rateLimit({ windowMs: minutes * 60 * 1000, max: limit })

export default rateLimit
