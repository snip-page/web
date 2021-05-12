import express, { Router } from 'express'

import SnipRequest from '../../lib/snip/request'
import getSnip from '../../lib/snip/get'
import CreateSnipData from '../../lib/snip/create/data'
import createSnip from '../../lib/snip/create'
import rateLimit from '../../lib/rate/limit'
import sendError from '../../lib/error/send'
import HttpError from '../../lib/error/http'

const router = Router()

router.get('/:id', async (_req, res, next) => {
	try {
		const req = _req as SnipRequest
		req.snip = await getSnip(req.params.id)

		next()
	} catch (error) {
		sendError(res, error)
	}
})

router.get('/snips/:id', async ({ params }, res) => {
	try {
		const snip = await getSnip(params.id)
		if (!snip) throw new HttpError(404, 'Snip not found')

		res.send(snip)
	} catch (error) {
		sendError(res, error)
	}
})

router.post(
	'/snips',
	rateLimit(15, 60),
	express.json(),
	async ({ headers, body }, res) => {
		try {
			if (headers['content-type'] !== 'application/json')
				throw new HttpError(400, 'Invalid content type')

			if (!(typeof body === 'object' && body))
				throw new HttpError(400, 'Invalid body')

			const { name, text, public: isPublic }: CreateSnipData = body

			if (
				!(
					typeof name === 'string' &&
					typeof text === 'string' &&
					typeof isPublic === 'boolean'
				)
			)
				throw new HttpError(400, 'Invalid body')

			res.send(await createSnip(body))
		} catch (error) {
			sendError(res, error)
		}
	}
)

export default router
