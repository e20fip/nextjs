"use client"

import { useCompletion } from "ai/react"
import { useSession } from "next-auth/react"
import style from "./gemini.module.css"
import markdownit from "markdown-it"

export default function Completion() {
  const { data: session } = useSession()
  if (!session && session?.user.role !== "admin") {
    return <div className="content">Access Denied</div>
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
