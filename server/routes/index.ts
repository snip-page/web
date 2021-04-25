import { Router } from 'express'

import security from './security'
import snip from './snip'
import recentSnips from './snip/recent'

const router = Router()

router.use(security)

router.use(snip)
router.use(recentSnips)

export default router
