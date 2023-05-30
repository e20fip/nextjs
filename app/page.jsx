import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import Category from '@/models/category'
import Image from 'next/image'
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
      .select('_id title content createdAt')
      .limit(4)
    return JSON.parse(JSON.stringify(blogs))
  } catch (e) {
    //console.log(e)
  }
}

export default async function Page() {
  const datas = await getData()
  return (
    <>
      <HeaderImage />
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: <LimitText longText={data.content} />
                  }}
                />
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

function HeaderImage() {
  return (
    <div className="headimages">
      <Image
        priority
        fill
        src="/images/web-pillow.jpg"
        alt="pillow"
        className="hero_img"
      />
      <div className="headtext">
        &quot;Try to be a rainbow in someone&apos;s cloud.&quot;
        <span>Maya Angelou</span>
      </div>
    </div>
  )
}
