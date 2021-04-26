import puppeteer, { Browser } from 'puppeteer'

let browser: Browser | null = null

const getBrowser = async () => (browser ??= await puppeteer.launch())

export default getBrowser
