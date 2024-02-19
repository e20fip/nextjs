"use client"
import { useCompletion } from "ai/react"
import style from "./gemini.module.css"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"

function checkSession() {
  const { data: session, status } = useSession()
  if (status !== "loading" && !session) {
    return redirect("/api/auth/signin")
  }
}

export default function Completion() {
  checkSession()
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit
  } = useCompletion()

  return (
    <div className={style.main}>
      <div className={style.output}>
        <Markdown rehypePlugins={[rehypeHighlight]}>{completion}</Markdown>
      </div>
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
