import { Router } from 'express'

import RecentSnipsRequest from '../../lib/snip/recent/request'
import getRecentSnips from '../../lib/snip/recent'
import sendError from '../../lib/error/send'

const router = Router()

router.get('/', async (_req, res, next) => {
	try {
		const req = _req as RecentSnipsRequest
		req.snips = await getRecentSnips()

		next()
	} catch (error) {
		sendError(res, error)
	}
})

router.get('/snips', async (_req, res) => {
	try {
		res.send(await getRecentSnips())
	} catch (error) {
		sendError(res, error)
	}
})

export default router
