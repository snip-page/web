import { Router } from 'express'

import getSnip from '../../lib/snip/get'
import getImage from '../../lib/snip/image'
import HttpError from '../../lib/error/http'
import sendError from '../../lib/error/send'

const router = Router()

router.get('/snips/:id/image', async (req, res) => {
	try {
		const snip = await getSnip(req.params.id)
		if (!snip) throw new HttpError(404, 'Snip not found')

		res.type('png').send(await getImage(snip))
	} catch (error) {
		sendError(res, error)
	}
})

export default router
