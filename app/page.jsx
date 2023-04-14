async function getData() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const datas = await getData()

  return (
    <>
      {datas?.map((data) => (
        <ul key={data.id}>
          <li>{data.title}</li>
          <li>{data.body}</li>
        </ul>
      ))}
    </>
  )
}
