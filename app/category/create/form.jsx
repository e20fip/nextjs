"use client"
import { useRef } from "react"
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { redirect } from "next/navigation"

const Form = ({ handlerSubmit }) => {
  const { data: session, status } = useSession()
  if (status !== "loading" && !session && session?.user.role !== "admin") {
    return redirect("/")
  }
  const inputRef = useRef(null)
  const inputRefPhoto = useRef(null)

  const submitDatas = async () => {
    if (inputRef.current.value === "" || inputRefPhoto.current.value === "")
      return

    const datas = {
      title: inputRef.current.value,
      picture: inputRefPhoto.current.value
    }
    await handlerSubmit(datas)

    toast.success("Submit Category Success", {
      theme: "dark",
      autoClose: 3000
    })

    inputRef.current.value = null
    inputRefPhoto.current.value = null
  }

  return (
    <>
      <div className="content">
        <div className="form">
          <label>
            <span>Category Title</span>
          </label>
          <input type="text" ref={inputRef} placeholder="Title" />
          <label>
            <span>Category Photo URL</span>
          </label>
          <input type="text" ref={inputRefPhoto} placeholder="photo URL" />
          <button onClick={submitDatas}>Submit</button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Form
