import Form from './form'
import Categories from './categories'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectTodb } from '@/lib/database'
import Category from '@/models/category'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function getCategories() {
  try {
    await connectTodb()
    const datas = await Category.find({})
    return datas
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

async function editCategory(id, title) {
  'use server'
  try {
    const filter = { _id: id }
    const update = {
      title: title.trim()
    }
    await connectTodb()
    await Category.findOneAndUpdate(filter, update)
    revalidatePath('/category/create')
  } catch (error) {
    //
  }
}

export default async function CreateCategory() {
  'use server'
  const session = await getServerSession(authOptions)
  const listCategories = await getCategories()
  if (session?.user.role !== 'admin') {
    redirect('/')
  }

  async function handlerSubmit(datas) {
    'use server'

    if (datas !== '') {
      try {
        await connectTodb()
        const newCategory = new Category({
          title: datas.trim()
        })
        revalidatePath('/category/create')
        await newCategory.save()
      } catch (error) {
        //
      }
    }
  }
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
            deleteCategory={deleteCategory}
            editCategory={editCategory}
          />
        ))}
      </div>
    </>
  )
}
