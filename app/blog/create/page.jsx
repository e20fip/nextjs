import Form from './form'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import Category from '@/models/category'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function getCategory() {
  try {
    await connectTodb()
    const listCategory = await Category.find({})
    return JSON.parse(JSON.stringify(listCategory))
  } catch (error) {
    //
  }
}

async function handlerSubmit(userId, cat, title, text) {
  'use server'
  if (title !== '' || text !== '') {
    try {
      await connectTodb()
      const newBlog = new Blog({
        creator: userId,
        category: cat,
        title: title.trim(),
        content: text.trim()
      })
      await newBlog.save()
      revalidatePath('/')
    } catch (error) {
      //
    }
  }
}

export default async function CreateBlog() {
  const session = await getServerSession(authOptions)

  if (!session && session?.user.role !== 'admin') {
    redirect('/')
  }

  const category = await getCategory()

  return <Form handlerSubmit={handlerSubmit} category={category} />
}
