import { connectTodb } from "@/lib/database"
import Blog from "@/models/blog"
import Category from "@/models/category"

async function getBlogsPost() {
  try {
    connectTodb()
    const blogs = await Blog.find({})
      .select("_id updatedAt")
      .sort({ createdAt: -1 })
      .lean()
    const category = await Category.find({}).select("title").lean()

    return { blogs, category }
  } catch (e) {
    console.log({ sitemap: e })
  }
}

export default async function sitemap() {
  const baseurl = process.env.NEXTAUTH_URL
  const { blogs, category } = await getBlogsPost()
  const blogId = blogs?.map((post) => {
    return {
      url: `${baseurl}/post/${post._id.toString()}`,
      lastModified: post.updatedAt
    }
  })
  const categoryTitle = category?.map((catTitle) => {
    return {
      url: `${baseurl}/list/${catTitle.title}`,
      lastModified: new Date()
    }
  })

  return [
    { url: baseurl, lastModified: new Date() },
    ...blogId,
    ...categoryTitle
  ]
}
