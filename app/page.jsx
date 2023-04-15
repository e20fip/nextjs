import clientPromise from '@/lib/mongodb'
import styles from './page.module.css'
import Image from 'next/image'

async function getData() {
  try {
    const client = await clientPromise
    const db = await client.db('mongoTest')

    const notes = await db
      .collection('notes')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return notes
  } catch (e) {
    console.log(e)
  }
}

export default async function Page() {
  const datas = await getData()

  return (
    <>
      <HeaderImage />
      <div className={styles.content}>
        {datas?.map((data) => (
          <ul key={data._id}>
            <li>
              <span className={styles.title}>{data.title}</span>
            </li>
            <li>
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </li>
          </ul>
        ))}
      </div>
    </>
  )
}

function HeaderImage() {
  return (
    <div className={styles.headimages}>
      <Image
        priority
        fill
        src="/images/web-pillow.jpg"
        alt="pillow"
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}
