import SnipMeta from 'lib/snip/meta'

export interface RecentSnipsProps {
	snips: SnipMeta[]
}

const RecentSnips = ({ snips }: RecentSnipsProps) => (
	<section>
		<h3>recent snips</h3>
		{snips.map(snip => (
			<p key={snip.id}>{snip.name}</p>
		))}
	</section>
)

export default RecentSnips
