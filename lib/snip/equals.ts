import Snip from '.'

const snipEquals = (a: Snip, b: Snip) => a.name === b.name && a.text === b.text

export default snipEquals
