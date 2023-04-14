import Ad from './sidebar/ad'
import styles from './about.module.css'

export default function AboutLayout({ children }) {
  return (
    <div className={styles.about}>
      <div className={styles.boxmain}>{children}</div>
      <Ad />
    </div>
  )
}
