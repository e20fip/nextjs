import { SubmitButton } from "./upload-button"
import { writeFile } from "fs/promises"
import path from "path"

async function submitPicture(formData) {
  "use server"

  const file = formData.get("file")
  if (!file) {
    throw new Error("no file upload")
  }
  const byte = await file.arrayBuffer()
  const buffer = Buffer.from(byte)
  const filename = file.name.replaceAll(" ", "_")
  //console.log(filename)
  try {
    await writeFile(
      path.join(process.cwd(), "public/images/" + filename),
      buffer
    )
    return { Message: "Success", status: 201 }
  } catch (error) {
    console.log("Error occurred ", error)
    return { Message: "Failed", status: 500 }
  }
}

export default function UploadPage() {
  return (
    <form action={submitPicture}>
      <fieldset>
        <legend>Upload Picture</legend>
        <label htmlFor="file">Picture</label>
        <input type="file" name="file" required />
        <div className="button-container">
          <SubmitButton />
          <button type="reset">Clear</button>
        </div>
      </fieldset>
    </form>
  )
}
