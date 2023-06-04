import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import Link from 'next/link'
import Date from '@/lib/date'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import dynamic from 'next/dynamic'

const Sidemenu = dynamic(() => import('../sidemenu'), { ssr: false })

export const revalidate = 3600

async function getData(id) {
  try {
    await connectTodb()
    const blogs = await Blog.findById(id)
    return JSON.parse(JSON.stringify(blogs))
  } catch (e) {
    //
  }
}

async function getList(id) {
  try {
    await connectTodb()
    const lists = await Blog.find({ category: id })
      .select('_id category title createdAt')
      .sort({ createdAt: -1 })
    return JSON.parse(JSON.stringify(lists))
  } catch (e) {
    //
  }
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id)
  if (!post) return notFound()
  return {
    title: post.title,
    description: post.content.substring(0, 80)
  }
}

export async function generateStaticParams() {
  try {
    await connectTodb()
    const posts = await Blog.find({}).select('_id').sort({ createdAt: -1 })
    return posts.map((post) => ({ id: post.id.toString() }))
  } catch (e) {
    //
  }
}

export default async function Post({ params }) {
  const { id } = params
  const data = await getData(id)
  const lists = await getList(data.category)

  const processContent = await remark().use(html).process(data.content)
  if (!data) return notFound()

  return (
    <>
      <div className="post_container">
        {lists && <Sidemenu lists={lists} />}
        <div className="post_content">
          <h1 className="post_title">{data.title}</h1>
          <Date dateString={data.createdAt} />
          <div
            className="post_body"
            dangerouslySetInnerHTML={{ __html: processContent.value }}
          />
          <button>
            <Link href="/">HOME</Link>
          </button>
        </div>
      </div>
    </>
  )
}
