import Snip from '.'
import HttpError from 'lib/error/http'
import { RUN_ORIGIN } from 'lib/constants'
import getLanguage from './language'

const TIME_LIMIT = 5 // 5 seconds
const MEMORY_LIMIT = 30 * 1024 // 30 MB

export interface SnipResponse {
	stdout: string | null
	compile_output: string | null
	time: string | null
	memory: number | null
}

const runSnip = async (snip: Snip, input: string) => {
	const language = getLanguage(snip)
	if (!language) throw new Error('Unable to infer language')

	const submission = await fetch(
		`${RUN_ORIGIN}/submissions?wait=true&fields=stdout,compile_output,time,memory`,
		{
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				source_code: snip.text,
				language_id: language,
				stdin: input,
				redirect_stderr_to_stdout: true,
				cpu_time_limit: TIME_LIMIT,
				memory_limit: MEMORY_LIMIT
			})
		}
	)

	if (submission.status !== 201)
		throw new HttpError(submission.status, await submission.text())

	return (await submission.json()) as SnipResponse
}

export default runSnip
