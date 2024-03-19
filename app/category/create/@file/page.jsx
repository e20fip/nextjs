import path from "path"
import fs from "fs"
import Image from "next/image"
import style from "./category.module.css"

function ListFile({ filenames }) {
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

export default function ListfilePage() {
  const dir = path.join(process.cwd(), "./public/images")
  const filenames = fs.readdirSync(dir)
  return (
    <>
      <ListFile filenames={filenames} />
    </>
  )
}
