import { NextPage } from 'next'
import { AppProps } from 'next/app'

import 'components/App/index.scss'

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
	<Component {...pageProps} />
)

export default App
