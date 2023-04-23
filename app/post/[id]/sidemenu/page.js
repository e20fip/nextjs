import clientPromise from '@/lib/mongodb'
import Showhide from '../showhide'

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

  return <Showhide notes={notes} />
}
