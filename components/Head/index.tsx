import { useRouter } from 'next/router'
import NextHead from 'next/head'

import { ORIGIN } from 'lib/constants'

export interface HeadProps {
	title: string
	description: string | null
	image: string
}

const Head = ({ title, description: _description, image }: HeadProps) => {
	const url = `${ORIGIN}${useRouter().asPath}`
	const description = _description ?? ''

	return (
		<NextHead>
			<link key="canonical" rel="canonical" href={url} />

			<title key="title">{title}</title>
			<meta key="description" name="description" content={description} />

			<meta key="og-url" property="og:url" content={url} />
			<meta key="og-title" property="og:title" content={title} />
			<meta
				key="og-description"
				property="og:description"
				content={description}
			/>
			<meta key="og-image" property="og:image" content={image} />

			<meta key="twitter-url" name="twitter:url" content={url} />
			<meta key="twitter-title" name="twitter:title" content={title} />
			<meta
				key="twitter-description"
				name="twitter:description"
				content={description}
			/>
			<meta key="twitter-image" name="twitter:image" content={image} />
		</NextHead>
	)
}

export default Head
