import { Suspense } from 'react'
import Sidemenu from './sidemenu/page'

export default function PostLayout({ children }) {
  return (
    <>
      <div className="post_container">
        <Suspense fallback={<p>loading...</p>}>
          <Sidemenu />
        </Suspense>
        <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
      </div>
    </>
  )
}
