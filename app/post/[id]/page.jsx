import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import styles from '@/app/post/post.module.css'
import Link from 'next/link'
import Date from '@/lib/date'

export const dynamicParams = true

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
      <div className={styles.content}>
        <h1 className={styles.title}>{data.title}</h1>
        <Date dateString={data.createdAt.toISOString()} />
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{
            __html: data.content
          }}
        />
        <button>
          <Link href="/">HOME</Link>
        </button>
      </div>
    </>
  )
}
