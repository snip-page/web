import size from 'file-size'

const formatSize = (kilobytes: number) => size(kilobytes * 1024).human('jedec')

export default formatSize
