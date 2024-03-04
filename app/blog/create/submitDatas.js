"use server"
import { connectTodb } from "@/lib/database"
import User from "@/models/user"
import Blog from "@/models/blog"
import { revalidatePath } from "next/cache"

export default async function submitDatas(formData) {
  const formObj = Object.fromEntries(formData)
  const { email, cat, title, desc, text } = formObj

  try {
    await connectTodb()

    User.findOne({
      email: email
    })
      .then((user) => {
        const doc = new Blog({
          creator: user._id.toString(),
          category: cat,
          title: title.trim(),
          description: desc.trim().substring(0, 100),
          content: text.trim()
        })
        doc.save()
      })
      .catch((err) => console.log(err))
    revalidatePath("/")
  } catch (error) {
    //console.log(error)
  }
}
