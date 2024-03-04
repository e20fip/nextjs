"use server"
import { connectTodb } from "@/lib/database"
import Category from "@/models/category"
import { revalidatePath } from "next/cache"

export async function editCategory(formData) {
  const id = formData.get("id")
  const title = formData.get("title")
  const picture = formData.get("picture")

  try {
    const filter = { _id: id }
    const update = {
      title: title,
      picture: picture
    }
    await connectTodb()
    await Category.findOneAndUpdate(filter, update)
    revalidatePath("/category/create")
  } catch (error) {
    //
  }
}

export async function handlerSubmit(formData) {
  const title = formData.get("title")
  const picture = formData.get("picture")

  try {
    await connectTodb()
    const newCategory = new Category({
      title: title,
      picture: picture
    })
    await newCategory.save()
    revalidatePath("/category/create")
  } catch (error) {
    //
  }
}

export async function deleteCategory(formData) {
  const id = formData.get("id")
  try {
    await connectTodb()
    await Category.findByIdAndDelete(id)
    revalidatePath("/category/create")
  } catch (error) {
    //
  }
}
