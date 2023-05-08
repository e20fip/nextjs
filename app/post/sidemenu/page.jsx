import postStyles from '@/app/post/post.module.css'
import clientPromise from '@/lib/mongodb'
import Showhide from '../showhide'
import Link from 'next/link'
import Date from '@/lib/date'
/* export const revalidate = 3600 */

export default async function Sidemenu() {
  const client = await clientPromise
  const db = await client.db('mongoTest')
  const notes = await db
    .collection('notes')
    .find({})
    .sort({ createdAt: -1 })
    .map((note) => ({
      _id: note._id.toString(),
      title: note.title,
      createdAt: note.createdAt.toISOString()
    }))
    .toArray()

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
