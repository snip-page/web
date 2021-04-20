import { NextPage } from 'next'

import Props from 'lib/snip/page/props'

const SnipPage: NextPage<Props> = ({ snip }) => <h1>{JSON.stringify(snip)}</h1>

export default SnipPage
