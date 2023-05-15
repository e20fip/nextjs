import { Suspense } from 'react'
import Sidemenu from './sidemenu/page'
import CustomLoading from '../components/customload'

export default function PostLayout({ children }) {
  return (
    <>
      <div className="post_container">
        <Suspense fallback={<CustomLoading />}>
          <Sidemenu />
        </Suspense>
        <Suspense fallback={<CustomLoading />}>{children}</Suspense>
      </div>
    </>
  )
}
