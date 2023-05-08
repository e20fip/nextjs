import { Suspense } from 'react'
import Sidemenu from './sidemenu/page'
import styles from '@/app/post/post.module.css'

export default function PostLayout({ children }) {
  return (
    <>
      <div className={styles.post_container}>
        <Suspense fallback={<p>loading...</p>}>
          <Sidemenu />
        </Suspense>
        <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
      </div>
    </>
  )
}
