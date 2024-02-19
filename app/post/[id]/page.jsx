import { connectTodb } from "@/lib/database"
import Blog from "@/models/blog"
import Link from "next/link"
import Date from "@/lib/date"
import { notFound } from "next/navigation"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import Sidemenu from "../sidemenu"
import Markdown from "react-markdown"

export const revalidate = 3600

async function getData(id) {
  try {
    await connectTodb()
    const blogs = await Blog.findById(id)
    if (!blogs) return notFound()
    return JSON.parse(JSON.stringify(blogs))
  } catch (e) {
    //
  }
}

async function getList(id) {
  try {
    await connectTodb()
    const lists = await Blog.find({ category: id })
      .select("_id category title createdAt")
      .sort({ createdAt: -1 })
      .lean()
    if (!lists) return notFound()
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
    description: post.description.substring(0, 80)
  }
}

export async function generateStaticParams() {
  try {
    await connectTodb()
    const posts = await Blog.find({}).select("_id").sort({ createdAt: -1 })
    return posts.map((post) => ({ id: post.id.toString() }))
  } catch (e) {
    //
  }
}

export default async function Post({ params }) {
  const { id } = params
  const data = await getData(id)
  const lists = await getList(data.category)

  return (
    <>
      <div className="post_container">
        {lists && <Sidemenu lists={lists} />}
        <div className="post_content">
          <h1 className="post_title">{data.title}</h1>
          <Date dateString={data.createdAt} />
          <div className="post_body">
            <Markdown rehypePlugins={[rehypeHighlight, remarkGfm]}>
              {data.content}
            </Markdown>
          </div>
          <button>
            <Link href="/">HOME</Link>
          </button>
        </div>
      </div>
    </>
  )
}
