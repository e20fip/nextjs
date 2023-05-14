import Form from '@/app/components/form'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'

const CreateBlog = async () => {
  const session = await getServerSession(authOptions)

  const handlerSubmit = async (title, text) => {
    'use server'

    if (session?.user.role !== 'admin') return
    if (title === '' || text === '') return

    try {
      await connectTodb()
      const newBlog = new Blog({
        creator: session?.user.id,
        title: title,
        content: text
      })
      await newBlog.save()
    } catch (error) {
      console.log(error)
    }
  }

  return <Form handlerSubmit={handlerSubmit} />
}

export default CreateBlog
