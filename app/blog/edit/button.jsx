'use client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { redirect } from 'next/navigation'

const Button = ({ deleteData, listCategory, datas, submitDatas }) => {
  const { data: session } = useSession()
  if (!session && session?.user.role !== 'admin') {
    redirect('/')
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
          {isComfirm && 'Cancel'}
          {!isComfirm && 'Delete'}
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

  const submitForm = async (id, cat, title, desc, body) => {
    if (title == '' || desc == '' || body == '') return
    await submitDatas(id, cat, title, desc, body)
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
          <button
            onClick={() =>
              submitForm(
                contentDatas.id,
                contentDatas.categoryId,
                contentDatas.title,
                contentDatas.desc,
                contentDatas.body
              )
            }
          >
            submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Button
