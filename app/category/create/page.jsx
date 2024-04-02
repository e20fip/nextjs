import Form from "./form"
import { connectTodb } from "@/lib/database"
import Category from "@/models/category"
import { revalidatePath } from "next/cache"

async function handlerSubmit({ title, picture }) {
  "use server"
  if (title === "" || picture === "") return
  try {
    await connectTodb()
    const newCategory = new Category({
      title: title.trim(),
      picture: picture.trim()
    })
    await newCategory.save()
  } catch (error) {
    //
  }
  revalidatePath("/category/create")
}
export default async function CreateCategory() {
  "use server"

  return (
    <div className="content">
      <Form handlerSubmit={handlerSubmit} />
    </div>
  )
}
