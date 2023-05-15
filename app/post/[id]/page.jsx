import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import Link from 'next/link'
import Date from '@/lib/date'

//export const dynamicParams = true

async function getData(id) {
  try {
    await connectTodb()
    const blogs = await Blog.findById(id)
    return blogs
  } catch (e) {
    //
  }
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id)
  return {
    title: post.title,
    description: post.content.substring(0, 80)
  }
}

export default async function Post({ params }) {
  const { id } = params
  const data = await getData(id)

  return (
    <>
      <div className="post_content">
        <h1 className="post_title">{data.title}</h1>
        <Date dateString={data.createdAt.toISOString()} />
        <div
          className="post_body"
          dangerouslySetInnerHTML={{
            __html: data.content
          }}
        />
        <button>
          <Link href="/" prefetch={false}>
            HOME
          </Link>
        </button>
      </div>
    </>
  )
}
