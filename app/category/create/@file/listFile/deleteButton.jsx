"use client"
import { useRouter } from "next/navigation"
import style from "../category.module.css"

export default function DeleteButton({ url }) {
  const route = useRouter()
  return (
    <span
      className={style.miniLink}
      onClick={async () => {
        await fetch("/api/upload", {
          method: "DELETE",
          body: JSON.stringify(url)
        })
        route.refresh()
      }}
    >
      Delete
    </span>
  )
}
