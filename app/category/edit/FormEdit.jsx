import { editCategory } from "../create/serverAction"
import { useFormStatus } from "react-dom"

const FormEdit = ({ id, title, picture, setIsEditForm }) => {
  return (
    <div className="model-box">
      <span className="close-box" onClick={() => setIsEditForm(false)}>
        &#x2715;
      </span>
      <div className="content">
        <form className="form" action={editCategory}>
          <input type="hidden" id="id" name="id" value={id} />
          <label>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={title}
            required
          />
          <label>Photo URL</label>
          <input
            type="text"
            id="picture"
            name="picture"
            defaultValue={picture}
            required
          />
          <Btn />
        </form>
      </div>
    </div>
  )
}

const Btn = () => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? "Success" : "Submit"}
    </button>
  )
}

export default FormEdit
