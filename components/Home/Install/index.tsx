import styles from './index.module.scss'

const Install = () => (
	<section className={styles.root}>
		<h3 className={styles.install}>install snip</h3>
		<pre className={styles.code}>npm i -g snip-page</pre>
		<h3 className={styles.run}>snip a file!</h3>
		<pre className={styles.code}>snip [filename]</pre>
	</section>
)

export default Install
