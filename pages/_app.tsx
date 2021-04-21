import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import 'components/App/index.scss'

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
	<>
		<Component {...pageProps} />
		<ToastContainer />
	</>
)

export default App
