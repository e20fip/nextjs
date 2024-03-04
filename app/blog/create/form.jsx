"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import style from "./ai.module.css"
import { useCompletion } from "ai/react"
import submitDatas from "./submitDatas"
import { useFormStatus } from "react-dom"
import { useRef } from "react"

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

const Form = ({ category }) => {
  const { data: session, status } = useSession()

  const formRef = useRef()
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

  const userEmail = session?.user?.email

  return (
    <>
      <div className="content">
        <form className="form" ref={formRef} action={submitDatas}>
          <input type="hidden" name="email" defaultValue={userEmail} />
          <label htmlFor="title">
            <span>Title</span>
          </label>
          <input name="title" type="text" placeholder="title" required />
          <label htmlFor="category">
            <span>Category</span>
          </label>
          <select name="cat">
            {category?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
          <label htmlFor="description">
            <span>Description</span>
          </label>
          <input name="desc" type="text" placeholder="description" required />
          <label htmlFor="content">
            <span>Content</span>
          </label>
          <textarea
            name="text"
            placeholder="body"
            required
            defaultValue={completion}
          />
          <SubmitBtn formRef={formRef} />
        </form>
        <FormAi
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          stop={stop}
          isLoading={isLoading}
          input={input}
        />
      </div>
    </>
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
    <>
      <h1>Gemini AI</h1>
      <form className={style.inputContainer} onSubmit={handleSubmit}>
        <div className={style.inputform}>
          <input
            placeholder="Ask something..."
            value={input}
            onChange={handleInputChange}
          />
          {isLoading && <LoadStatus />}
        </div>
        <div className={style.buttonContainer}>
          <button type="button" onClick={stop}>
            Stop
          </button>
          <button disabled={isLoading} type="submit">
            {isLoading ? "Wait" : "Send"}
          </button>
        </div>
      </form>
    </>
  )
}

const SubmitBtn = ({ formRef }) => {
  const { pending } = useFormStatus()
  {
    pending ? "" : formRef.current?.reset()
  }
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? "Success" : "Submit"}
    </button>
  )
}

export default Form
