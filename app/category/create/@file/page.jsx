"use client"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import Link from "next/link"

export default function AvatarUploadPage() {
  const inputFileRef = useRef(null)
  const route = useRouter()
  return (
    <>
      <div className="button-container">
        <Link href="/category/create/listFile">List</Link>
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault()

          const file = inputFileRef.current.files[0]

          const response = await fetch(`/api/upload?filename=${file.name}`, {
            method: "POST",
            body: file
          })

          const newBlob = await response.json()
          if (newBlob) {
            route.push("/category/create/listFile")
          }
        }}
      >
        <fieldset>
          <legend>Upload files</legend>
          <input name="file" ref={inputFileRef} type="file" required />
          <div className="button-container">
            <button type="submit">Upload</button>
            <button type="reset">Clear</button>
          </div>
        </fieldset>
      </form>
    </>
  )
}
