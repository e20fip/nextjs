import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import styles from '@/app/page.module.css'
import Link from 'next/link'
import Date from '@/lib/date'

async function getData(id) {
  try {
    const client = await clientPromise
    const db = await client.db('mongoTest')
    const note = await db.collection('notes').findOne({ _id: new ObjectId(id) })

    return note
  } catch (e) {
    //
  }
}

export default async function Post({ params }) {
  const id = params.id
  const data = await getData(id)

  return (
    <>
      <div className={styles.content}>
        <ul>
          <li>
            <h1 className={styles.title}>{data.title}</h1>
            <Date dateString={data.createdAt.toISOString()} />
          </li>
          <li>
            <div
              dangerouslySetInnerHTML={{
                __html: data.content
              }}
            />
          </li>
        </ul>
        <button>
          <Link href="/">HOME</Link>
        </button>
      </div>
    </>
  )
}
