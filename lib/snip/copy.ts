import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'

const embedSnip = () => {
	copy(
		`<iframe src="${window.location.href}" width="800" height="600" style="border:none"></iframe>`
	)

	toast.dark('Copied embed code to clipboard')
}

export default embedSnip
