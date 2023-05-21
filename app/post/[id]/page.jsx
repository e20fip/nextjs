import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import Link from 'next/link'
import Date from '@/lib/date'
import Showhide from '../showhide'
import { notFound } from 'next/navigation'

export const revalidate = 3600

async function getData(id) {
  try {
    await connectTodb()
    const blogs = await Blog.findById(id)
    return blogs
  } catch (e) {
    //
  }
}

async function getList() {
  try {
    await connectTodb()
    const lists = await Blog.find({})
      .select('_id title createdAt')
      .sort({ createdAt: -1 })
    return lists
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

async function Sidemenu() {
  const lists = await getList()
  return (
    lists && (
      <ul className="post_listmenu">
        {lists.map((list) => (
          <li key={list._id.toString()}>
            <Link href={`post/${list._id.toString()}`} className="post_link">
              {list.title.substring(0, 30)}
            </Link>
            <Date dateString={list.createdAt.toISOString()} />
          </li>
        ))}
      </ul>
    )
  )
}

export default async function Post({ params }) {
  const { id } = params
  const data = await getData(id)

  if (!data) return notFound()

  return (
    <>
      <div className="post_container">
        <Showhide>
          <Sidemenu />
        </Showhide>
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
            <Link href="/">HOME</Link>
          </button>
        </div>
      </div>
    </>
  )
}
