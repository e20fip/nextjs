import styles from './home.module.css'
import Image from 'next/image'

const datas = [
  {
    id: 1,
    image: '1.jpg',
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    id: 2,
    image: '2.jpg',
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
  },
  {
    id: 3,
    image: '3.jpg',
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
  },
  {
    id: 4,
    image: '4.jpg',
    title: 'eum et est occaecati',
    body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'
  },
  {
    id: 5,
    image: '5.jpg',
    title: 'nesciunt quas odio',
    body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque'
  },
  {
    id: 6,
    image: '6.jpg',
    title: 'dolorem eum magni eos aperiam quia',
    body: 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae'
  }
]

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
