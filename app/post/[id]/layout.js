import Showhide from './showhide'
import Sidemenu from './sidemenu.js/page'
import postStyles from '@/app/post/post.module.css'

export default function PostLayout({ children }) {
  return (
    <div className={postStyles.container}>
      <Sidemenu />
      <Showhide />
      {children}
    </div>
  )
}
