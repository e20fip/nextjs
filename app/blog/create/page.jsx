import Form from "./Form"
import { connectTodb } from "@/lib/database"
import Category from "@/models/category"

async function getCategory() {
  try {
    await connectTodb()
    const listCategory = await Category.find({}).lean()
    return JSON.parse(JSON.stringify(listCategory))
  } catch (error) {
    //
  }
}

export default async function CreateBlog() {
  const category = await getCategory()

  return <Form category={category} />
}
