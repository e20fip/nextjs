'use client'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Form = ({ handlerSubmit }) => {
  const refTitle = useRef()
  const refText = useRef()

  const submitDatas = async (title, text) => {
    if (title === '' || text === '') return
    await handlerSubmit(title, text)
    toast.success('Content Submit', {
      autoClose: 3000,
      theme: 'dark'
    })
    refTitle.current.value = ''
    refText.current.value = ''
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
            <span>Content</span>
          </label>
          <textarea placeholder="body" ref={refText} required />
          <button
            onClick={() =>
              submitDatas(refTitle.current.value, refText.current.value)
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
