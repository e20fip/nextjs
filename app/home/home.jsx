import Image from 'next/image'
import datas from '@/lib/datas.json'

export default async function Home() {
  const resp = await datas

  return (
    <>
      <h2 className="home_head_text">Blog Posts</h2>
      <div className="card_container">
        {resp?.map((data) => (
          <div className="card" key={data.id}>
            <div className="home_image">
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
            <div className="home_title">{data.title}</div>
            <div className="home_content">{data.body}</div>
          </div>
        ))}
      </div>
    </>
  )
}
