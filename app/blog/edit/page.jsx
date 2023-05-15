import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import Button from './button'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function getDatas() {
  'use server'
  try {
    await connectTodb()
    const datas = await Blog.find({})
      .select('_id, title')
      .sort({ createdAt: -1 })
    return datas
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

export default async function EditBlog() {
  const session = await getServerSession(authOptions)

  if (session?.user.role !== 'admin') {
    redirect('/')
  }
  const datas = await getDatas()

  return (
    <div className="content">
      {datas.map((data) => (
        <div className="grid_table" key={data._id.toString()}>
          {data.title}
          <Button deleteData={deleteData} contentId={data._id.toString()} />
        </div>
      ))}
    </div>
  )
}
