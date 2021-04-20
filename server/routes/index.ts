import { Router } from 'express'

import security from './security'
import snip from './snip'

const router = Router()

router.use(security)
router.use(snip)

export default router
