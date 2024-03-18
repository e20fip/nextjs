import { connectTodb } from "@/lib/database"
import Blog from "@/models/blog"
import Category from "@/models/category"
import Link from "next/link"
import Date from "@/lib/date"
import { notFound } from "next/navigation"
import remarkGfm from "remark-gfm"
import Sidemenu from "@/app/components/sidemenu"
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

//export const revalidate = 3600
export const dynamicParams = true

async function getData(id) {
  try {
    await connectTodb()
    const blogs = await Blog.findById(id).populate("category").lean()
    if (!blogs) return notFound()
    const lists = await Blog.find({ category: blogs.category })
      .select("_id title description")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
    return JSON.parse(JSON.stringify({ blogs, lists }))
  } catch (e) {
    //
  }
}

export async function generateMetadata({ params }) {
  const baseUrl = process.env.NEXTAUTH_URL
  const { blogs } = await getData(params.id)
  return {
    metadataBase: new URL(baseUrl),
    title: blogs?.title,
    description: blogs?.description.substring(0, 80),
    alternates: {
      canonical: `${baseUrl}/post/${params.id}`
    },
    openGraph: {
      title: blogs?.title,
      description: blogs?.description.substring(0, 80)
    }
  }
}

export async function generateStaticParams() {
  try {
    await connectTodb()
    const posts = await Blog.find({})
      .select("_id")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()
    const id = posts?.map((post) => ({ id: post._id.toString() }))
    if (!id) return notFound()
    return id
  } catch (e) {
    console.log({ error: e })
  }
}

export default async function Post({ params }) {
  const { id } = params
  const { blogs, lists } = await getData(id)

  return (
    <>
      <div className="post_container">
        <div className="post_container_textbg">{blogs?.category?.title}</div>
        <Sidemenu lists={lists} />
        <div className="post_content">
          <h1 className="post_title">{blogs?.title}</h1>
          <div className="info">
            <span>{blogs?.category?.title}</span>
            {blogs?.createdAt && <Date dateString={blogs.createdAt} />}
          </div>
          <div className="post_body">
            <Markdown
              ehypePlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props
                  const match = /language-(\w+)/.exec(className || "")
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      language={match[1]}
                      style={atomDark}
                      showLineNumbers={true}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {blogs?.content}
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
