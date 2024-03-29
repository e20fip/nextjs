"use client"
import { useState } from "react"

const Categories = ({ id, title, picture, deleteCategory, editCategory }) => {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)
  const [category, setCategory] = useState({
    id: id,
    title: title,
    picture: picture
  })
  const [isEditForm, setIsEditForm] = useState(false)

  const handlerDelete = async (id) => {
    if (!id) return
    await deleteCategory(id)
  }

  return (
    <>
      <div className="grid_table">
        <span>{title}</span>
        <span className="link" onClick={() => setIsEditForm(true)}>
          Edit
        </span>
        <span
          className="link"
          onClick={() => setIsConfirmDelete((prev) => !prev)}
        >
          {isConfirmDelete && "Cancel"}
          {!isConfirmDelete && "Delete"}
        </span>
        {isConfirmDelete && (
          <button onClick={() => handlerDelete(id)} className="small-button">
            confirm
          </button>
        )}
      </div>
      {isEditForm && (
        <FormEdit
          category={category}
          setCategory={setCategory}
          setIsEditForm={setIsEditForm}
          editCategory={editCategory}
        />
      )}
    </>
  )
}

const FormEdit = ({ category, setCategory, setIsEditForm, editCategory }) => {
  const submitForm = async (id, title, picture) => {
    if (id === "" || title === "" || picture === "") return
    await editCategory(id, title, picture)
    setIsEditForm(false)
  }

  return (
    <div className="model-box">
      <span className="close-box" onClick={() => setIsEditForm(false)}>
        &#x2715;
      </span>
      <div className="content">
        <div className="form">
          <label>Title</label>
          <input
            type="text"
            value={category.title}
            onChange={(e) =>
              setCategory({ ...category, title: e.target.value })
            }
            required
          />
          <label>Photo URL</label>
          <input
            type="text"
            value={category.picture}
            onChange={(e) =>
              setCategory({ ...category, picture: e.target.value })
            }
            required
          />
          <button
            onClick={() =>
              submitForm({
                id: category.id,
                title: category.title,
                picture: category.picture
              })
            }
          >
            submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Categories
