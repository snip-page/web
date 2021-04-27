import { Router } from 'express'

import security from './security'
import assets from './assets'
import snip from './snip'
import recentSnips from './snip/recent'
import snipPreview from './snip/preview'
import rawSnip from './snip/raw'

const router = Router()

router.use(security)
router.use(assets)

router.use(snip)
router.use(recentSnips)
router.use(snipPreview)
router.use(rawSnip)

export default router
