import styles from './index.module.scss'

export const SUBTITLE =
	'Share your code with one command. Allow others to run your code in an online IDE. Embed runnable code on your website.'

const HomeInfo = () => (
	<section className={styles.root}>
		<p className={styles.subtitle}>{SUBTITLE}</p>
	</section>
)

export default HomeInfo
