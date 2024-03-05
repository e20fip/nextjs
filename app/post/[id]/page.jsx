import { connectTodb } from "@/lib/database"
import Blog from "@/models/blog"
import Link from "next/link"
import Date from "@/lib/date"
import { notFound } from "next/navigation"
import remarkGfm from "remark-gfm"
import Sidemenu from "@/app/components/sidemenu"
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export const revalidate = 3600

async function getData(id) {
  try {
    await connectTodb()
    const blogs = await Blog.findById(id).populate("category").lean()
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
      .select("_id category title description createdAt")
      .sort({ createdAt: -1 })
      .limit(10)
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
    title: post?.title,
    description: post?.description.substring(0, 80)
  }
}

export async function generateStaticParams() {
  try {
    await connectTodb()
    const posts = await Blog.find({})
      .select("_id")
      .sort({ createdAt: -1 })
      .lean()
    const id = posts?.map((post) => {
      return { id: post._id.toString() }
    })
    return id
  } catch (e) {
    //
  }
}

export default async function Post({ params }) {
  const { id } = params
  const data = await getData(id)
  const lists = await getList(data?.category)

  return (
    <>
      <div className="post_container">
        <div className="post_container_textbg">{data?.category?.title}</div>
        {lists && <Sidemenu lists={lists} />}
        <div className="post_content">
          <h1 className="post_title">{data?.title}</h1>
          <div className="info">
            <span>{data?.category?.title}</span>
            {data?.createdAt && <Date dateString={data.createdAt} />}
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
              {data?.content}
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
