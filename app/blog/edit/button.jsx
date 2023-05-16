'use client'
import { useState } from 'react'

const Button = ({
  deleteData,
  contentId,
  contentTitle,
  content,
  submitDatas
}) => {
  const [isComfirm, setIsConfirm] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const doDelete = async (contentId) => {
    await deleteData(contentId)
  }

  return (
    <>
      <div className="grid_table">
        <span>{contentTitle}</span>
        <span className="link" onClick={() => setIsEdit(true)}>
          Edit
        </span>
        <span className="link" onClick={() => setIsConfirm((prev) => !prev)}>
          Delete
        </span>
        {isComfirm && (
          <button onClick={() => doDelete(contentId)} className="small-button">
            Confirm Delete
          </button>
        )}
      </div>
      {isEdit && (
        <FormEdit
          contentId={contentId}
          contentTitle={contentTitle}
          content={content}
          setIsEdit={setIsEdit}
          submitDatas={submitDatas}
        />
      )}
    </>
  )
}

const FormEdit = ({
  contentId,
  contentTitle,
  content,
  setIsEdit,
  submitDatas
}) => {
  const [data, setData] = useState({
    title: contentTitle,
    body: content
  })

  const formHanler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const submitForm = async (id, title, body) => {
    if (title == '' || body == '') return
    await submitDatas(id, title, body)
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
            value={data.title}
            onChange={formHanler}
            required
          />
          <label>
            <span>Content</span>
          </label>
          <textarea
            name="body"
            placeholder="body"
            value={data.body}
            onChange={formHanler}
            required
          />
          <button onClick={() => submitForm(contentId, data.title, data.body)}>
            submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Button
