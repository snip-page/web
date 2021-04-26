import { Router } from 'express'

import getSnip from '../../lib/snip/get'
import getImage from '../../lib/snip/image'
import HttpError from '../../lib/error/http'
import sendError from '../../lib/error/send'

const router = Router()

router.get('/:id/preview', async (req, res) => {
	try {
		const snip = await getSnip(req.params.id)
		if (!snip) throw new HttpError(404, 'Snip not found')

		const image = await getImage(snip)

		res.header('cache-control', 'public, max-age=31536000, immutable')
		res.type('png').send(image)
	} catch (error) {
		sendError(res, error)
	}
})

export default router
