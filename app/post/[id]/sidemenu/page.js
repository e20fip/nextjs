import postStyles from '@/app/post/post.module.css'
import clientPromise from '@/lib/mongodb'
import Link from 'next/link'
import Date from '@/lib/date'

import Showhide from '../showhide'

/* export const revalidate = 3600 */

async function getData() {
  const client = await clientPromise
  const db = await client.db('mongoTest')
  const datas = await db
    .collection('notes')
    .find({})
    .sort({ createdAt: -1 })
    .map((note) => ({
      _id: note._id.toString(),
      title: note.title,
      createdAt: note.createdAt.toISOString()
    }))
    .toArray()

  return datas
}

export default async function Sidemenu() {
  const notes = await getData()

  return (
    <Showhide>
      <ul className={postStyles.listmenu}>
        {notes?.map((note) => (
          <li key={note._id}>
            <Link href={`post/${note._id}`} className={postStyles.link}>
              {note.title.substring(0, 30)}
            </Link>
            <Date dateString={note.createdAt} />
          </li>
        ))}
      </ul>
    </Showhide>
  )
}
