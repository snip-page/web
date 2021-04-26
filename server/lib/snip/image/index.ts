import Snip from '..'
import getBrowser from './browser'
import getContent from './content'
import getCode from './code'
import HttpError from '../../error/http'

const WIDTH = 600

const getImage = async (snip: Snip) => {
	const browser = await getBrowser()
	const page = await browser.newPage()

	try {
		await page.setViewport({ width: WIDTH, height: 0 })

		await page.setContent(await getContent(getCode(snip)), {
			waitUntil: 'networkidle0'
		})

		const code = await page.$('#code')
		if (!code) throw new HttpError(500, 'Unable to find the code element')

		const bounds = await code.boundingBox()
		if (!bounds) throw new HttpError(500, 'Unable to get code dimensions')

		const data = await page.screenshot({ clip: bounds })
		if (!Buffer.isBuffer(data)) throw new HttpError(500, 'Invalid image data')

		return data
	} finally {
		await page.close()
	}
}

export default getImage
