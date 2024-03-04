import Form from "./form"
import { connectTodb } from "@/lib/database"
import User from "@/models/user"
import Blog from "@/models/blog"
import Category from "@/models/category"
import { revalidatePath } from "next/cache"

async function getCategory() {
  try {
    await connectTodb()
    const listCategory = await Category.find({}).lean()
    return JSON.parse(JSON.stringify(listCategory))
  } catch (error) {
    //
  }
}

async function handlerSubmit(userEmail, cat, title, desc, text) {
  "use server"

  if (title !== "" || desc !== "" || text !== "") {
    try {
      await connectTodb()

      User.findOne({
        email: userEmail
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
}

export default async function CreateBlog() {
  const category = await getCategory()

  return <Form handlerSubmit={handlerSubmit} category={category} />
}
