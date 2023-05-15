import Form from '@/app/components/form'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import { redirect } from 'next/navigation'

async function CreateBlog() {
  const session = await getServerSession(authOptions)

  if (session?.user.role !== 'admin') {
    redirect('/')
  }

  async function handlerSubmit(title, text) {
    'use server'

    if (title !== '' || text !== '') {
      try {
        await connectTodb()
        const newBlog = new Blog({
          creator: session?.user?.id,
          title: title,
          content: text
        })
        await newBlog.save()
      } catch (error) {
        //
      }
    }
  }

  return <Form handlerSubmit={handlerSubmit} />
}

export default CreateBlog
