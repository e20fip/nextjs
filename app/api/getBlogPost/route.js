import { connectTodb } from "@/lib/database"
import Blog from "@/models/blog"
import Category from "@/models/category"

async function getData(id) {
  try {
    await connectTodb()
    const blogs = await Blog.findById(id)
      .populate("category")
      .select("title")
      .lean()
    return JSON.parse(JSON.stringify(blogs))
  } catch (e) {
    console.log({ api: e })
  }
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")
  const blogs = await getData(id)
  return Response.json(blogs)
}
