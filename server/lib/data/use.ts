import { PoolClient } from 'pg'

import pool from './pool'

const useClient = async <Result>(
	transform: (client: PoolClient) => Promise<Result> | Result
) => {
	const client = await pool.connect()

	try {
		return await transform(client)
	} finally {
		client.release()
	}
}

export default useClient
