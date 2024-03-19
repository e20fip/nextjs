"use client"
import { useState } from "react"

async function submitPicture(e) {
  e.preventDefault()
}

export default function UploadPage() {
  const [file, setFile] = useState()
  return (
    <form onSubmit={(e) => submitPicture(e)}>
      <fieldset>
        <legend>Upload Picture</legend>
        <label htmlFor="file">Picture</label>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <div className="button-container">
          <button type="submit">Upload</button>
          <button type="reset">Clear</button>
        </div>
      </fieldset>
    </form>
  )
}
