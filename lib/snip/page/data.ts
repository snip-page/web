import { GetServerSideProps } from 'next'

import Query from './query'
import Props from './props'
import SnipRequest from '../request'

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
	req
}) => {
	const { snip } = (req as unknown) as SnipRequest
	if (!snip) return { notFound: true }

	return {
		props: { snip }
	}
}
