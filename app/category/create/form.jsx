'use client'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Form = ({ handlerSubmit }) => {
  const inputRef = useRef(null)

  const submitDatas = async () => {
    if (inputRef.current.value === '') return false

    await handlerSubmit(inputRef.current.value)

    toast.success('Submit Category Success', {
      theme: 'dark',
      autoClose: 3000
    })

    inputRef.current.value = null
  }

  return (
    <>
      <div className="content">
        <div className="form">
          <label>
            <span>Category Title</span>
          </label>
          <input type="text" ref={inputRef} />
          <button onClick={submitDatas}>Submit</button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Form
