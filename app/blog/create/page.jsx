import Form from './form'
import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import Category from '@/models/category'
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

async function handlerSubmit(userId, cat, title, desc, text) {
  'use server'

  if (title !== '' || desc !== '' || text !== '') {
    try {
      await connectTodb()
      const newBlog = new Blog({
        creator: userId,
        category: cat,
        title: title.trim(),
        description: desc.trim().substring(0, 100),
        content: text.trim()
      })
      await newBlog.save()
      revalidatePath('/')
    } catch (error) {
      //console.log(error)
    }
  }
}

export default async function CreateBlog() {
  const category = await getCategory()

  return <Form handlerSubmit={handlerSubmit} category={category} />
}
