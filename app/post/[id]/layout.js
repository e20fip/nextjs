import Sidemenu from './sidemenu/page'
import styles from '@/app/post/post.module.css'

export default function PostLayout({ children }) {
  return (
    <>
      <div className={styles.post_container}>
        <Sidemenu />
        {children}
      </div>
    </>
  )
}
