import Form from "./Form"
import Categories from "./Categories"
import { connectTodb } from "@/lib/database"
import Category from "@/models/category"

async function getCategories() {
  try {
    await connectTodb()
    const datas = await Category.find({}).lean()
    return JSON.parse(JSON.stringify(datas))
  } catch (error) {
    //
  }
}

export default async function CreateCategory() {
  const listCategories = await getCategories()

  return (
    <>
      <Form />
      <div className="content">
        <div className="title">Categories</div>
        {listCategories?.map((category) => (
          <Categories
            key={category._id.toString()}
            id={category._id.toString()}
            title={category.title}
            picture={category.picture}
          />
        ))}
      </div>
    </>
  )
}
