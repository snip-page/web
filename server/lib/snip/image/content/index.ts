import getTemplate from './template'
import getFont from './font'

const getContent = async (code: string) =>
	(await getTemplate())({ font: await getFont(), code })

export default getContent
