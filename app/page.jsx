import { connectTodb } from '@/lib/database'
import Blog from '@/models/blog'
import styles from './page.module.css'
import Image from 'next/image'
import Date from '@/lib/date'
import LimitText from '@/lib/texttrim'
import Link from 'next/link'
import Home from './home/home'

/* export const dynamic = 'force-dynmic' */
export const revalidate = 3600

async function getData() {
  try {
    await connectTodb()
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .select('_id title content createdAt')
      .limit(2)

    return blogs
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
          <ul key={data._id.toString()}>
            <li>
              <div className={styles.title}>
                <Link href={`/post/${data._id}`}>{data.title}</Link>
              </div>
              <Date dateString={data.createdAt.toISOString()} />
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
        <Home />
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
      <div className={styles.headtext}>
        &quot;Try to be a rainbow in someone&apos;s cloud.&quot;
        <span>Maya Angelou</span>
      </div>
    </div>
  )
}
