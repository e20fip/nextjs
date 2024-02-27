"use client"
import { useRef } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

import { useCompletion } from "ai/react"

const LoadStatus = () => {
  return (
    <div className={style.input_loading}>
      <div className={style.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

const FormAi = ({
  handleSubmit,
  handleInputChange,
  isLoading,
  stop,
  input
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          placeholder="Ask something..."
          value={input}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button type="button" onClick={stop}>
          Stop
        </button>
        <button disabled={isLoading} type="submit">
          Send
        </button>
      </div>
    </form>
  )
}

const Form = ({ handlerSubmit, category }) => {
  const { data: session, status } = useSession()
  const refTitle = useRef(null)
  const refCat = useRef(null)
  const refDesc = useRef(null)
  const refText = useRef(null)

  if (status !== "loading" && !session && session?.user.role !== "admin") {
    return redirect("/")
  }

  const submitDatas = async (userEmail, cat, title, desc, text) => {
    if (title === "" || desc === "" || text === "") return

    await handlerSubmit(userEmail, cat, title, desc, text)

    toast.success("Submit Content Success", {
      theme: "dark",
      autoClose: 3000
    })

    refTitle.current.value = null
    refDesc.current.value = null
    refText.current.value = null
  }

  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit
  } = useCompletion()

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
          <textarea
            placeholder="body"
            ref={refText}
            required
            defaultValue={completion}
          />
          {/* {isLoading && <LoadStatus />} */}
          <button
            onClick={() =>
              submitDatas(
                session.user.email,
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
        <FormAi
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          stop={stop}
          isLoading={isLoading}
          input={input}
        />
      </div>

      <ToastContainer />
    </>
  )
}

export default Form
