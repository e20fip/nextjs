"use client"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import style from "./ai.module.css"
import { useCompletion } from "ai/react"
import { SpinLoading } from "@/app/components/spinLoading"

const FormAi = ({
  input,
  stop,
  isLoading,
  handleInputChange,
  handleSubmit
}) => {
  return (
    <>
      <h1>Gemini AI</h1>
      <form className={style.inputContainer} onSubmit={handleSubmit}>
        <div className={style.inputform}>
          <input
            placeholder="Ask something..."
            value={input}
            onChange={handleInputChange}
          />
          {isLoading && <SpinLoading className="miniLoading" />}
        </div>
        <div className={style.buttonContainer}>
          <button type="button" onClick={stop}>
            Stop
          </button>
          <button disabled={isLoading} type="submit">
            Send
          </button>
        </div>
      </form>
    </>
  )
}

const initValue = {
  title: "",
  cat: "",
  desc: "",
  text: ""
}

const Form = ({ handlerSubmit, category }) => {
  const { data: session, status } = useSession()
  if (status !== "loading" && !session && session?.user.role !== "admin") {
    return redirect("/")
  }
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit
  } = useCompletion()

  const [submit, setSubmit] = useState(initValue)

  const submitDatas = async (e, userEmail) => {
    e.preventDefault()
    const cat = submit.cat
    const title = submit.title
    const desc = submit.desc
    const text = submit.text

    if (title === "" || cat === "" || desc === "" || text === "") return

    await handlerSubmit(userEmail, cat, title, desc, text)

    setSubmit(initValue)

    toast.success("Submit Content Success", {
      theme: "dark",
      autoClose: 3000
    })
  }

  function submitValue(e) {
    return setSubmit({
      ...submit,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <div className="content">
        <form
          className="form"
          onSubmit={(e) => submitDatas(e, session.user.email)}
        >
          <label htmlFor="title">
            <span>Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={submit.title}
            onChange={submitValue}
            required
          />
          <label htmlFor="category">
            <span>Category</span>
          </label>
          <select name="cat" value={submit.cat} onChange={submitValue} required>
            {!submit.cat && (
              <option value="" disabled>
                select category
              </option>
            )}
            {category?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
          <label htmlFor="description">
            <span>Description</span>
          </label>
          <input
            type="text"
            name="desc"
            placeholder="description"
            value={submit.desc}
            onChange={submitValue}
            required
          />
          <label htmlFor="content">
            <span>Content</span>
          </label>
          <textarea
            placeholder="body"
            name="text"
            value={submit.text || completion}
            required
            onChange={submitValue}
          />
          <button type="submit">submit</button>
        </form>
        <FormAi
          input={input}
          stop={stop}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <ToastContainer />
    </>
  )
}

export default Form
