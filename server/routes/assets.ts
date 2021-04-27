import express, { Router } from 'express'
import { join } from 'path'

import { ROOT } from '../lib/constants'

const router = Router()

router.use(
	express.static(join(ROOT, 'public'), {
		setHeaders: res => {
			res.header('cache-control', 'public, max-age=31536000, immutable')
		}
	})
)

export default router
