"use client"

import { useCompletion } from "ai/react"
import style from "./gemini.module.css"
import markdownit from "markdown-it"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Completion() {
  const { data: session, status } = useSession()
  if (status !== "loading" && !session && session !== "admin") {
    return redirect("/api/auth/signin")
  }
  const md = markdownit()
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit
  } = useCompletion()

  const result = md.render(completion)

  return (
    <div className={style.main}>
      <div
        className={style.output}
        dangerouslySetInnerHTML={{ __html: result }}
      ></div>

      <form className={style.inputContainer} onSubmit={handleSubmit}>
        <input
          placeholder="Ask something..."
          value={input}
          onChange={handleInputChange}
        />

        <div className={style.buttonContainer}>
          <button type="button" onClick={stop}>
            Stop
          </button>
          <button disabled={isLoading} type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
