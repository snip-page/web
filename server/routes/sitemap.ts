import { Router } from 'express'
import { create as xml } from 'xmlbuilder2'

import getSnips from '../lib/snip/ids'
import sendError from '../lib/error/send'
import { ORIGIN } from '../lib/constants'

const router = Router()

router.get('/sitemap.xml', async (_req, res) => {
	try {
		const data = xml(
			{ version: '1.0', encoding: 'UTF-8' },
			{
				urlset: {
					'@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
					'@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
					'@xsi:schemaLocation':
						'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
					url: (await getSnips()).map(snip => ({
						loc: `${ORIGIN}/${snip.id}`
					}))
				}
			}
		).end()

		res.contentType('application/xml').send(data)
	} catch (error) {
		sendError(res, error)
	}
})

export default router
