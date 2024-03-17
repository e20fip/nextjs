"use client"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import FormAi from "@/app/blog/component/formAi"

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

  async function pasteToTextBox() {
    const text = await navigator.clipboard.readText()
    if (!text) return
    return setSubmit({ ...submit, text: (submit.text += text) })
  }

  function clearText() {
    return setSubmit(initValue)
  }

  return (
    <>
      <div className="content">
        <form
          className="form"
          onSubmit={(e) => submitDatas(e, session.user.email)}
        >
          <fieldset>
            <legend>Create</legend>
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
            <select
              name="cat"
              value={submit.cat}
              onChange={submitValue}
              required
            >
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
              placeholder="content"
              name="text"
              value={submit.text}
              required
              onChange={submitValue}
            />
            <div className="button-container">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => pasteToTextBox()}>
                Paste
              </button>
              <button type="button" onClick={() => clearText()}>
                Clear
              </button>
            </div>
          </fieldset>
        </form>
        <FormAi />
      </div>
      <ToastContainer />
    </>
  )
}

export default Form
