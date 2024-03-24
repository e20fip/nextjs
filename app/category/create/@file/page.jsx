"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import style from "./category.module.css"
import Image from "next/image"

function MaterialSymbolsFileUpload() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 24 24"
    >
      <path
        fill="#ffac38"
        d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
      ></path>
    </svg>
  )
}

export default function UploadPage() {
  const [files, setFiles] = useState()
  const [isUpload, setIsUpload] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [previewFile, setPreviewFile] = useState()
  const route = useRouter()

  function handlerDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
    setIsHover(true)
  }

  function handlerLeave(e) {
    e.preventDefault()
    e.stopPropagation()
    setIsHover(false)
  }

  function handlerDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    setIsHover(false)
    const dt = e.dataTransfer
    const getFile = dt.files[0]
    const type = getFile.type.split("/")
    if (type[0] == "image") {
      setFiles(getFile)
      displayPreviewFile(getFile.name, getFile)
    }
  }

  function displayPreviewFile(name, file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const file = reader.result
      setPreviewFile({ name: name, file: file })
    }
  }

  function handleOnChange(e) {
    setFiles(e.target.files[0])
  }

  function resetHandler() {
    setFiles("")
    setPreviewFile({})
  }

  async function submitUpload(e) {
    e.preventDefault()

    if (files) {
      setIsUpload(true)
      const response = await fetch(`/api/upload?filename=${files.name}`, {
        method: "POST",
        body: files
      })

      const newBlob = await response.json()
      if (newBlob) {
        setFiles()
        setIsUpload(false)
        setPreviewFile({})
        route.refresh()
      }
    }
  }

  return (
    <>
      <div className="button-container">
        <Link href="/category/create/listFile">List</Link>
      </div>
      <form onSubmit={submitUpload}>
        <fieldset>
          <legend>Upload files</legend>
          <input
            name="file"
            type="file"
            accept="image/*"
            className={style.inputUpload}
            onChange={handleOnChange}
          />
          <div
            style={{
              borderColor: isHover ? "red" : "",
              backgroundColor: isUpload ? "black" : ""
            }}
            className={style.uploadComponent}
            onDragOver={handlerDragOver}
            onDrop={handlerDrop}
            onDragLeave={handlerLeave}
          >
            {!files && <MaterialSymbolsFileUpload />}
            {isUpload && "Upload file"}
            {!files && "Drag and Drop file here"}
            {previewFile?.file && (
              <div className={style.innerImage}>
                <Image
                  src={previewFile.file}
                  alt={previewFile.name}
                  width={180}
                  height={80}
                />
              </div>
            )}
          </div>
          <div className="button-container">
            <button type="submit" disabled={isUpload}>
              Upload
            </button>
            <button type="reset" onClick={resetHandler}>
              Clear
            </button>
          </div>
        </fieldset>
      </form>
    </>
  )
}
