import { Router } from 'express'
import { getCSP, SELF, INLINE, DATA, EVAL } from 'csp-header'

import { ORIGIN, DEV } from '../lib/constants'

const router = Router()

router.use(({ headers, url }, res, next) => {
	DEV || headers['x-forwarded-proto'] === 'https'
		? next()
		: res.redirect(301, `https://${headers.host}${url}`)
})

router.use((_req, res, next) => {
	res.header('access-control-allow-credentials', 'true')
	res.header('access-control-allow-origin', ORIGIN)

	res.header('expect-ct', '0')
	res.header('referrer-policy', 'no-referrer')
	res.header('strict-transport-security', 'max-age=15552000')
	res.header('x-content-type-options', 'nosniff')
	res.header('x-dns-prefetch-control', 'off')
	res.header('x-download-options', 'noopen')
	res.header('x-frame-options', 'SAMEORIGIN')
	res.header('x-permitted-cross-domain-policies', 'none')
	res.header('x-xss-protection', '0')

	res.header(
		'content-security-policy',
		getCSP({
			directives: {
				'default-src': [SELF],
				'style-src': [SELF, INLINE],
				'script-src': [
					SELF,
					...(DEV ? [EVAL] : []),
					"'sha256-Nqnn8clbgv+5l0PgxcTOldg8mkMKrFn4TvPL+rYUUGg='" // Render-blocking script
				],
				'img-src': [SELF, DATA],
				'base-uri': SELF,
				'upgrade-insecure-requests': !DEV
			}
		})
	)

	next()
})

export default router
