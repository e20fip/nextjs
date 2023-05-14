import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import postStyles from '@/app/post/post.module.css'
import Showhide from '../showhide'
import Link from 'next/link'
import Date from '@/lib/date'
/* export const revalidate = 3600 */

async function getData() {
  try {
    await connectTodb()
    const blogs = await Blog.find({})
      .select('_id title createdAt')
      .sort({ createdAt: -1 })
    return blogs
  } catch (error) {
    //
  }
}

export default async function Sidemenu() {
  const datas = await getData()
  return (
    <Showhide>
      <ul className={postStyles.listmenu}>
        {datas?.map((data) => (
          <li key={data._id.toString()}>
            <Link
              href={`post/${data._id.toString()}`}
              className={postStyles.link}
            >
              {data.title.substring(0, 30)}
            </Link>
            <Date dateString={data.createdAt.toISOString()} />
          </li>
        ))}
      </ul>
    </Showhide>
  )
}
