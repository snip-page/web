import { Router } from 'express'

import security from './security'
import snip from './snip'
import recentSnips from './snip/recent'
import snipPreview from './snip/preview'

const router = Router()

router.use(security)

router.use(snip)
router.use(recentSnips)
router.use(snipPreview)

export default router
