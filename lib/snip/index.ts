import SnipMeta from './meta'

export default interface Snip extends SnipMeta {
	text: string
	public: boolean
}
