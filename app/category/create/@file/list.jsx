"use client"
import Image from "next/image"
import style from "./category.module.css"

export default function ListFile({ filenames }) {
  return (
    <div className={style.imageContainer}>
      {filenames?.map((name, index) => (
        <div className={style.innerImage} key={index}>
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={`/images/${name}`}
            alt={name}
            priority={false}
          />
          <span className={style.imageTitle}>{name}</span>
        </div>
      ))}
    </div>
  )
}
