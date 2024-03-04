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
  } catch (error) {
    //
  }
  revalidatePath("/category/create")
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
  } catch (error) {
    //
  }
  revalidatePath("/category/create")
}

export async function deleteCategory(formData) {
  const id = formData.get("id")
  try {
    await connectTodb()
    await Category.findByIdAndDelete(id)
  } catch (error) {
    //
  }
  revalidatePath("/category/create")
}
