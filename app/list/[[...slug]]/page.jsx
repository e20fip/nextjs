import { connectTodb } from "@/lib/database"
import Blog from "@/models/blog"
import Category from "@/models/category"
import Date from "@/lib/date"
import LimitText from "@/lib/texttrim"
import Link from "next/link"
import Image from "next/image"
import Pagination from "@/app/components/pagination"

export const revalidate = 3600

async function getData(query) {
  //console.log(query)
  const limit = 20
  const skip = query.pageNum * limit - limit

  try {
    await connectTodb()
    const datas = Category.findOne({ title: query.category })
      .then(async (cat) => {
        //if (!cat) return
        const catId = cat._id.toString()
        const catPicture = cat.picture
        const catTitle = cat.title
        const count = await Blog.countDocuments({ catagoryId: catId })
        const blogs = await Blog.find({ catagoryId: catId })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .select("_id title description createdAt")
          .lean()
          .exec()
        return {
          datas: JSON.parse(JSON.stringify(blogs)),
          catPicture: catPicture,
          catTitle: catTitle,
          count: Math.ceil(count / limit)
        }
      })
      .catch(() => {
        return false
      })
    return datas
  } catch (e) {
    //console.log(e)
  }
}

function PageNotFound() {
  return <div className="pagemessage">Error 404 not found!!</div>
}

export default async function List({ params }) {
  const category = params.slug[0]
  const pageNum = params.slug[1]

  const result = await getData({ category: category, pageNum: pageNum })
  if (!result) return <PageNotFound />
  const { datas, catPicture, catTitle, count } = result
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
                    src={`/images/${catPicture}`}
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
              <li className="small_align_right">{catTitle}</li>
            </ul>
          ))}
        </div>
      </div>
      {count !== 1 && <Pagination path={`/list/${catTitle}`} count={count} />}
    </>
  )
}