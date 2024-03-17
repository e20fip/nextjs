"use client"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { redirect } from "next/navigation"
import FormAi from "@/app/blog/component/formAi"

const Button = ({ deleteData, listCategory, datas, submitDatas }) => {
  const { data: session, status } = useSession()
  if (status !== "loading" && !session && session?.user.role !== "admin") {
    redirect("/")
  }
  const [isComfirm, setIsConfirm] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const { _id, title } = datas

  const doDelete = async (_id) => {
    await deleteData(_id)
  }

  return (
    <>
      <div className="grid_table">
        <span>{title}</span>
        <span className="link" onClick={() => setIsEdit(true)}>
          Edit
        </span>
        <span className="link" onClick={() => setIsConfirm((prev) => !prev)}>
          {isComfirm && "Cancel"}
          {!isComfirm && "Delete"}
        </span>
        {isComfirm && (
          <button onClick={() => doDelete(_id)} className="small-button">
            Confirm Delete
          </button>
        )}
      </div>
      {isEdit && (
        <FormEdit
          listCategory={listCategory}
          datas={datas}
          setIsEdit={setIsEdit}
          submitDatas={submitDatas}
        />
      )}
    </>
  )
}

const FormEdit = ({ listCategory, datas, setIsEdit, submitDatas }) => {
  const { _id, category, title, description, content } = datas
  const [contentDatas, setContentDatas] = useState({
    id: _id,
    categoryId: category._id,
    title: title,
    desc: description,
    body: content
  })

  const formHanler = (e) => {
    setContentDatas({
      ...contentDatas,
      [e.target.name]: e.target.value
    })
  }

  async function pasteToTextBox() {
    const text = await navigator.clipboard.readText()
    if (!text) return
    return setContentDatas({
      ...contentDatas,
      body: (contentDatas.body += text)
    })
  }

  function clearText() {
    return setContentDatas({
      id: "",
      categoryId: "",
      title: "",
      desc: "",
      body: ""
    })
  }

  const submitForm = async () => {
    const { id, categoryId, title, desc, body } = contentDatas
    if (id == "" || categoryId == "" || title == "" || desc == "" || body == "")
      return
    console.log("finish")
    await submitDatas(id, categoryId, title, desc, body)
    setIsEdit(false)
  }

  return (
    <div className="model-box">
      <span className="close-box" onClick={() => setIsEdit(false)}>
        &#x2715;
      </span>
      <div className="content">
        <div className="form">
          <label>
            <span>Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={contentDatas.title}
            onChange={formHanler}
            required
          />
          <label>
            <span>Category</span>
          </label>
          <select
            name="categoryId"
            onChange={formHanler}
            value={contentDatas.categoryId}
          >
            {!contentDatas.categoryId && (
              <option value="" disabled>
                select category
              </option>
            )}
            {listCategory?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
          <label>
            <span>Description</span>
          </label>
          <input
            name="desc"
            placeholder="description"
            value={contentDatas.desc}
            onChange={formHanler}
            required
          />
          <label>
            <span>Content</span>
          </label>
          <textarea
            name="body"
            placeholder="body"
            value={contentDatas.body}
            onChange={formHanler}
            required
          />
          <div className="button-container">
            <button type="submit" onClick={() => submitForm()}>
              submit
            </button>
            <button type="button" onClick={() => pasteToTextBox()}>
              Paste
            </button>
            <button type="button" onClick={() => clearText()}>
              Clear
            </button>
          </div>
        </div>
        <FormAi />
      </div>
    </div>
  )
}

export default Button
