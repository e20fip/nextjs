'use client'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Form = ({ handlerSubmit, category }) => {
  const { data: session } = useSession()
  const refTitle = useRef(null)
  const refCat = useRef(null)
  const refDesc = useRef(null)
  const refText = useRef(null)

  if (!session && session?.user.role !== 'admin') {
    return redirect('/')
  }

  const submitDatas = async (userId, cat, title, desc, text) => {
    if (title === '' || desc === '' || text === '') return

    await handlerSubmit(userId, cat, title, desc, text)

    toast.success('Submit Content Success', {
      theme: 'dark',
      autoClose: 3000
    })

    refTitle.current.value = null
    refDesc.current.value = null
    refText.current.value = null
  }

  return (
    <>
      <div className="content">
        <div className="form">
          <label>
            <span>Title</span>
          </label>
          <input type="text" placeholder="title" ref={refTitle} required />
          <label>
            <span>Category</span>
          </label>
          <select ref={refCat}>
            {category?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
          <label>
            <span>Description</span>
          </label>
          <input type="text" placeholder="description" ref={refDesc} required />
          <label>
            <span>Content</span>
          </label>
          <textarea placeholder="body" ref={refText} required />
          <button
            onClick={() =>
              submitDatas(
                session.user.id,
                refCat.current.value,
                refTitle.current.value,
                refDesc.current.value,
                refText.current.value
              )
            }
          >
            submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Form
