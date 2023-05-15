'use client'

const Button = ({ deleteData, contentId }) => {
  return (
    <>
      <span className="link">Edit</span>
      <span className="link" onClick={() => deleteData(contentId)}>
        Delete
      </span>
    </>
  )
}

export default Button
