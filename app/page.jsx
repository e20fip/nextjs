import clientPromise from '@/lib/mongodb'
import styles from './page.module.css'
import Image from 'next/image'
import Date from '@/lib/date'
import LimitText from '@/lib/texttrim'
import Link from 'next/link'
import headImg from '@/public/images/web-pillow.jpg'

/* export const dynamic = 'force-dynmic' */
/* export const revalidate = 3600 */

async function getData() {
  try {
    const client = await clientPromise
    const db = await client.db('mongoTest')
    const notes = await db
      .collection('notes')
      .find({})
      .map((notes) => ({
        _id: notes._id.toString(),
        title: notes.title,
        content: notes.content,
        createdAt: notes.createdAt.toISOString()
      }))
      .sort({ createdAt: -1 })
      .toArray()

    return notes
  } catch (e) {
    //
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
              <div className={styles.title}>
                <Link href={`/post/${data._id}`} prefetch={false}>
                  {data.title}
                </Link>
              </div>
              <Date dateString={data.createdAt} />
            </li>
            <li>
              <div
                dangerouslySetInnerHTML={{
                  __html: <LimitText longText={data.content} />
                }}
              />
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
        src={headImg}
        placeholder="blur"
        alt="pillow"
        style={{ objectFit: 'cover' }}
      />
      <div className={styles.headtext}>
        &quot;Try to be a rainbow in someone&apos;s cloud.&quot;
        <span>Maya Angelou</span>
      </div>
    </div>
  )
}
