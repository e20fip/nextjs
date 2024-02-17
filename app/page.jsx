import { connectTodb } from "@/lib/database"
import Blog from "@/models/blog"
import Category from "@/models/category"
import Date from "@/lib/date"
import LimitText from "@/lib/texttrim"
import Link from "next/link"
import Image from "next/image"
//export const dynamic = 'auto'
export const revalidate = 3600

async function getData() {
  try {
    await connectTodb()
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .populate("category")
      .select("_id title description createdAt")
      .limit(4)
      .lean()
    return JSON.parse(JSON.stringify(blogs))
  } catch (e) {
    //console.log(e)
  }
}

export default async function Page() {
  const datas = await getData()
  return (
    <>
      <div className="content">
        <div className="content_colume">
          {datas?.map((data) => (
            <ul key={data._id}>
              <li>
                <div className="home_image">
                  <Image
                    fill
                    src={`/images/${data.category.picture}`}
                    alt={data.title}
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 612px) 100vw,
                (max-width: 952px) 50vw,
                (max-width: 1238px) 33vw,
                (max-width: 1522px) 25vw,
                (max-width: 1920px) 17vw,"
                  />
                </div>
                <div className="title">
                  <Link href={`/post/${data._id}`}>{data.title}</Link>
                </div>
                <Date dateString={data.createdAt} />
              </li>
              <li>
                <LimitText longText={data.description} />
              </li>
              <li className="small_align_right">{data.category.title}</li>
            </ul>
          ))}
        </div>
      </div>
    </>
  )
}
