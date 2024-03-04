"use client"
import { useState } from "react"
import FormEdit from "../edit/FormEdit"
import { deleteCategory } from "./serverAction"

const Categories = ({ id, title, picture }) => {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)
  const [isEditForm, setIsEditForm] = useState(false)

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
        {isConfirmDelete && <FormDelete id={id} />}
      </div>
      {isEditForm && (
        <FormEdit
          id={id}
          title={title}
          picture={picture}
          setIsEditForm={setIsEditForm}
        />
      )}
    </>
  )
}

const FormDelete = ({ id }) => {
  return (
    <form className="form" action={deleteCategory}>
      <input type="hidden" name="id" value={id} />
      <button type="submit">confirm</button>
    </form>
  )
}

export default Categories
