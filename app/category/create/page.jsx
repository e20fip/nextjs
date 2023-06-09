import Form from './form'
import Categories from './categories'
import { connectTodb } from '@/lib/database'
import Category from '@/models/category'
import { revalidatePath } from 'next/cache'

async function getCategories() {
  try {
    await connectTodb()
    const datas = await Category.find({})
    return JSON.parse(JSON.stringify(datas))
  } catch (error) {
    //
  }
}

async function deleteCategory(id) {
  'use server'
  try {
    await connectTodb()
    await Category.findByIdAndDelete(id)
    revalidatePath('/category/create')
  } catch (error) {
    //
  }
}

async function editCategory({ id, title, picture }) {
  'use server'
  if (id === '' || title === '' || picture === '') return
  try {
    const filter = { _id: id }
    const update = {
      title: title.trim(),
      picture: picture.trim()
    }
    await connectTodb()
    await Category.findOneAndUpdate(filter, update)
    revalidatePath('/category/create')
  } catch (error) {
    //
  }
}
async function handlerSubmit({ title, picture }) {
  'use server'
  if (title === '' || picture === '') return
  try {
    await connectTodb()
    const newCategory = new Category({
      title: title.trim(),
      picture: picture.trim()
    })
    revalidatePath('/category/create')
    await newCategory.save()
  } catch (error) {
    //
  }
}
export default async function CreateCategory() {
  'use server'
  const listCategories = await getCategories()

  return (
    <>
      <Form handlerSubmit={handlerSubmit} />
      <div className="content">
        <div className="title">Categories</div>
        {listCategories?.map((category) => (
          <Categories
            key={category._id.toString()}
            id={category._id.toString()}
            title={category.title}
            picture={category.picture}
            deleteCategory={deleteCategory}
            editCategory={editCategory}
          />
        ))}
      </div>
    </>
  )
}
