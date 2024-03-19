import { list } from "@vercel/blob"
import style from "../category.module.css"
import DeleteButton from "./deleteButton"
import Image from "next/image"

export default async function AllFilesPage() {
  const { blobs } = await list()

  return (
    <>
      <div className={style.imageContainer}>
        {blobs &&
          blobs.map((blob, index) => (
            <div key={index} className={style.innerImage}>
              {blob.url}
              {/* <Image
                src={blob.url}
                alt={blob.pathname}
                fill
                sizes="(max-width: 768px) 33vw"
              /> */}
              <div className={style.imageTitle}>{blob.pathname}</div>
              <DeleteButton url={blob.url} />
            </div>
          ))}
        {blobs == "" && <div>No data</div>}
      </div>
    </>
  )
}
