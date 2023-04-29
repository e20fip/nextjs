import styles from './home.module.css'
import Image from 'next/image'
import datas from '@/lib/datas.json'

export default function Home() {
  const resp = datas

  return (
    <>
      <h2 className={styles.head_text}>Blog Posts</h2>
      <div className={styles.card_container}>
        {resp?.map((data) => (
          <div className={styles.card} key={data.id}>
            <div className={styles.image}>
              <Image
                fill
                src={`/images/${data.image}`}
                alt={data.title}
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 612px) 100vw,
                (max-width: 952px) 50vw,
                (max-width: 1238px) 33vw,
                (max-width: 1522px) 25vw,
                (max-width: 1920px) 17vw,"
              />
            </div>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.content}>{data.body}</div>
          </div>
        ))}
      </div>
    </>
  )
}
