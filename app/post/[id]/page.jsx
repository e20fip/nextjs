import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import styles from '@/app/post/post.module.css'
import Link from 'next/link'
import Date from '@/lib/date'

export async function generateStaticParams() {
  const client = await clientPromise
  const db = await client.db('mongoTest')
  const notes = await db
    .collection('notes')
    .find({})
    .map((note) => ({ note: note._id.toString }))
    .toArray()

  return notes.map((note) => ({
    id: note._id
  }))
}

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
  const { id } = params
  const data = await getData(id)

  return (
    <>
      <div className={styles.content}>
        <h1 className={styles.title}>{data.title}</h1>
        <Date dateString={data.createdAt.toISOString()} />
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{
            __html: data.content
          }}
        />
        <button>
          <Link href="/">HOME</Link>
        </button>
      </div>
    </>
  )
}