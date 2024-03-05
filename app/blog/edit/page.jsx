import { connectTodb } from "@/lib/database"
import Blog from "@/models/blog"
import Button from "./button"
import { revalidatePath } from "next/cache"
import Category from "@/models/category"

export const dynamic = "force-dynamic"

async function getDatas() {
  try {
    await connectTodb()
    const datas = await Blog.find({})
      .select("_id title description content")
      .populate("category")
      .sort({ createdAt: -1 })
      .lean()
    return JSON.parse(JSON.stringify(datas))
  } catch (error) {
    //
  }
}

async function getCategory() {
  try {
    await connectTodb()
    const category = await Category.find({}).lean()
    return JSON.parse(JSON.stringify(category))
  } catch (error) {
    //
  }
}

async function deleteData(id) {
  "use server"
  try {
    await connectTodb()
    await Blog.findByIdAndDelete(id)
    revalidatePath("/")
  } catch (error) {
    //
  }
}

async function submitDatas(id, cat, title, desc, body) {
  "use server"
  try {
    const filter = { _id: id }
    const update = {
      category: cat,
      title: title.trim(),
      description: desc.trim(),
      content: body.trim()
    }
    await connectTodb()
    await Blog.findOneAndUpdate(filter, update)
    revalidatePath("/")
  } catch (error) {
    //
  }
}

export default async function EditBlog() {
  "use server"

  const datas = await getDatas()
  const listCategory = await getCategory()

  return (
    <div className="content">
      {datas.map((data) => (
        <Button
          key={data._id.toString()}
          deleteData={deleteData}
          listCategory={listCategory}
          datas={data}
          submitDatas={submitDatas}
        />
      ))}
    </div>
  )
}
