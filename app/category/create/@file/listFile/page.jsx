import { list } from "@vercel/blob"
import style from "../category.module.css"
import DeleteButton from "./deleteButton"
import CopyFileUrl from "./copyFileUrl"
import Link from "next/link"
import Image from "next/image"

export default async function AllFilesPage() {
  const { blobs } = await list()

  return (
    <>
      <div className="button-container">
        <Link href="/category/create">Upload</Link>
      </div>
      <div className={style.imageContainer}>
        {blobs &&
          blobs.map((blob) => (
            <div className={style.cardImage} key={blob.url}>
              <div className={style.innerImage}>
                <Image
                  src={blob.url}
                  alt={blob.pathname}
                  width={150}
                  height={80}
                />
                <div className={style.imageTitle}>{blob.pathname}</div>
              </div>
              <CopyFileUrl url={blob.url} />
              <DeleteButton url={blob.url} />
            </div>
          ))}
        {blobs == "" && <div>No data</div>}
      </div>
    </>
  )
}
