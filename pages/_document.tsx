import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
	readonly render = () => (
		<Html lang="en">
			<Head />
			<body>
				<Main />
				<NextScript />
				<script> </script>
			</body>
		</Html>
	)
}
