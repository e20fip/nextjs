"use client"
import { useRef } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { handlerSubmit } from "./serverAction"
import { useFormStatus } from "react-dom"

const Form = () => {
  const { data: session, status } = useSession()
  if (status !== "loading" && !session && session?.user.role !== "admin") {
    return redirect("/")
  }

  const formRef = useRef()

  return (
    <>
      <div className="content">
        <form ref={formRef} className="form" action={handlerSubmit}>
          <label>
            <span>Category Title</span>
          </label>
          <input type="text" name="title" placeholder="Title" />
          <label>
            <span>Category Photo URL</span>
          </label>
          <input type="text" name="picture" placeholder="photo URL" />
          <Btn formRef={formRef} />
        </form>
      </div>
    </>
  )
}

const Btn = ({ formRef }) => {
  const { pending } = useFormStatus()
  pending ? "" : formRef.current?.reset()
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? "Success" : "Submit"}
    </button>
  )
}

export default Form
