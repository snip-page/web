import { Router } from 'express'

const router = Router()

router.get(['/styles/**', '/fonts/**'], (_req, res, next) => {
	res.header('cache-control', 'public, max-age=31536000, immutable')
	next()
})

export default router
