import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import Button from './button'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const dynamic = 'auto'

async function getDatas() {
  'use server'
  try {
    await connectTodb()
    const datas = await Blog.find({})
      .select('_id, title content')
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

async function submitDatas(id, title, body) {
  'use server'
  try {
    const filter = { _id: id }
    const update = {
      title: title,
      content: body
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

  return (
    <div className="content">
      {datas.map((data) => (
        <Button
          key={data._id.toString()}
          deleteData={deleteData}
          contentId={data._id.toString()}
          contentTitle={data.title}
          content={data.content}
          submitDatas={submitDatas}
        />
      ))}
    </div>
  )
}
