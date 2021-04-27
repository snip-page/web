import { Router } from 'express'
import subdomain from 'express-subdomain'

import getSnip from '../../lib/snip/get'
import getType from '../../lib/snip/type'
import HttpError from '../../lib/error/http'
import sendError from '../../lib/error/send'

const router = Router()

router.get('/:id', async (req, res) => {
	try {
		const snip = await getSnip(req.params.id)
		if (!snip) throw new HttpError(404, "There's nothing here!")

		res.header('cache-control', 'public, max-age=31536000, immutable')
		res.header(
			'content-disposition',
			`inline; filename=${JSON.stringify(snip.name)}`
		)

		res.removeHeader('content-security-policy')

		res.type(getType(snip)).send(snip.text)
	} catch (error) {
		sendError(res, error)
	}
})

router.use((_req, res) => {
	res.status(404).send("There's nothing here!")
})

export default subdomain('raw', router)
