import Snip from '.'
import HttpError from 'lib/error/http'
import { RUN_ORIGIN } from 'lib/constants'
import getLanguage from './language'

export interface SnipResponse {
	stdout: string | null
	time: string
	memory: number
}

const runSnip = async (snip: Snip, input: string) => {
	const language = getLanguage(snip)
	if (!language) throw new Error('Unable to infer language')

	const submission = await fetch(
		`${RUN_ORIGIN}/submissions?wait=true&fields=stdout,time,memory`,
		{
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				language_id: language,
				source_code: snip.text,
				stdin: input,
				redirect_stderr_to_stdout: true
			})
		}
	)

	if (submission.status !== 201)
		throw new HttpError(submission.status, await submission.text())

	return (await submission.json()) as SnipResponse
}

export default runSnip
