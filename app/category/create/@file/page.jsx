import path from "path"
import fs from "fs"
import ListFile from "./list"

export default function ListfilePage() {
  const dir = path.join(process.cwd(), "./public/images")
  const filenames = fs.readdirSync(dir)
  return (
    <>
      <ListFile filenames={filenames} />
    </>
  )
}
