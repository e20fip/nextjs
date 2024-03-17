import style from "./ai.module.css"
import { SpinLoading } from "@/app/components/spinLoading"
import { useCompletion } from "ai/react"
import { useRef } from "react"

function copyText(text) {
  navigator.clipboard.writeText(text)
}

export default function FormAi() {
  const refText = useRef()
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
      <form className={style.inputContainer} onSubmit={handleSubmit}>
        <fieldset>
          <legend>Gemini AI</legend>
          <div className={style.inputform}>
            <input
              placeholder="Ask something..."
              value={input}
              onChange={handleInputChange}
            />
            {isLoading && <SpinLoading className="miniLoading" />}
          </div>
          <div className={style.buttonContainer}>
            <button disabled={isLoading} type="submit">
              Send
            </button>
            <button type="button" onClick={stop}>
              Stop
            </button>
            <button
              type="button"
              onClick={() => copyText(refText.current.value)}
            >
              Copy
            </button>
          </div>
          <textarea
            placeholder="Gemini AI Generate Content"
            name="GeminiAi"
            ref={refText}
            value={completion}
            disabled
          />
        </fieldset>
      </form>
    </>
  )
}
