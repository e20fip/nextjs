"use client"
import style from "../category.module.css"

export default function CopyFileUrl({ url }) {
  function copyUrl(url) {
    navigator.clipboard.writeText(url)
  }
  return (
    <span type="button" className={style.miniLink} onClick={() => copyUrl(url)}>
      copy url
    </span>
  )
}
