import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

import styles from 'components/App/index.module.scss'

import 'components/App/index.scss'

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
	<>
		<Head>
			<meta key="og-site-name" property="og:site_name" content="snip" />
			<meta key="og-type" property="og:type" content="website" />
			<meta
				key="twitter-card"
				name="twitter:card"
				content="summary_large_image"
			/>
			<meta key="twitter-site" name="twitter:site" content="@snip-page" />
			<meta key="twitter-creator" name="twitter:creator" content="@snip-page" />
			<meta key="twitter-domain" name="twitter:domain" content="snip.page" />
			<meta
				key="msapplication-tilecolor"
				name="msapplication-TileColor"
				content={styles.theme}
			/>
			<meta key="theme-color" name="theme-color" content={styles.theme} />
		</Head>
		<Component {...pageProps} />
		<ToastContainer />
	</>
)

export default App
