import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import Category from '@/models/category'
import Date from '@/lib/date'
import LimitText from '@/lib/texttrim'
import Link from 'next/link'
import Home from './home/home'

//export const dynamic = 'auto'
export const revalidate = 3600

async function getData() {
  try {
    await connectTodb()
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .populate('category')
      .select('_id title description createdAt')
      .limit(4)
      .lean()
    return JSON.parse(JSON.stringify(blogs))
  } catch (e) {
    //console.log(e)
  }
}

export default async function Page() {
  const datas = await getData()
  return (
    <>
      <div className="content">
        <div className="content_colume">
          {datas?.map((data) => (
            <ul key={data._id}>
              <li>
                <div className="title">
                  <Link href={`/post/${data._id}`}>{data.title}</Link>
                </div>
                <Date dateString={data.createdAt} />
              </li>
              <li>
                <LimitText longText={data.description} />
              </li>
              <li>{data.category.title}</li>
            </ul>
          ))}
        </div>
        <Home />
      </div>
    </>
  )
}
