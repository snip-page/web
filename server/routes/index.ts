import { Router } from 'express'

import security from './security'
import snip from './snip'
import recentSnips from './snip/recent'
import snipImage from './snip/image'

const router = Router()

router.use(security)

router.use(snip)
router.use(recentSnips)
router.use(snipImage)

export default router
