import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import Button from './button'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Category from '@/models/category'

export const dynamic = 'auto'

async function getDatas() {
  try {
    await connectTodb()
    const datas = await Blog.find({})
      .select('_id title content')
      .populate('category')
      .sort({ createdAt: -1 })
    return JSON.parse(JSON.stringify(datas))
  } catch (error) {
    //
  }
}

async function getCategory() {
  try {
    await connectTodb()
    const category = await Category.find({})
    return JSON.parse(JSON.stringify(category))
  } catch (error) {
    //
  }
}

async function deleteData(id) {
  'use server'
  try {
    await connectTodb()
    await Blog.findByIdAndDelete(id)
    revalidatePath('/blog/edit')
  } catch (error) {
    //
  }
}

async function submitDatas(id, cat, title, body) {
  'use server'
  try {
    const filter = { _id: id }
    const update = {
      category: cat,
      title: title.trim(),
      content: body.trim()
    }
    await connectTodb()
    await Blog.findOneAndUpdate(filter, update)
    revalidatePath('blog/edit')
  } catch (error) {
    //
  }
}

export default async function EditBlog() {
  const session = await getServerSession(authOptions)

  if (session?.user.role !== 'admin') {
    redirect('/')
  }
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
