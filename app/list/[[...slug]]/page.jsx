import { connectTodb } from "@/lib/database"
import Blog from "@/models/blog"
import Category from "@/models/category"
import Date from "@/lib/date"
import LimitText from "@/lib/texttrim"
import Link from "next/link"
import Image from "next/image"
import Pagination from "@/app/components/pagination"
import { notFound } from "next/navigation"

export const revalidate = 3600

const limit = 20
export async function generateStaticParams() {
  try {
    let countCat = []
    await connectTodb()
    const blogCount = await Blog.find({}).select("_id category").lean()
    const category = await Category.find({}).select("_id title").lean()
    category.map((c) => {
      const resultPage = blogCount.filter((cat) => {
        return cat.category == c._id.toString()
      })
      const catTitle = c.title
      const perPage = Math.ceil(resultPage.length / limit)
      for (let i = 1; i < perPage + 1; i++) {
        const pageNum = i == 1 ? "" : i
        countCat = [...countCat, { slug: [catTitle, pageNum.toString()] }]
      }
    })
    return countCat
  } catch (e) {
    console.log({ error: e })
  }
}

export async function generateMetadata({ params }) {
  const title = params.slug[0]
  return {
    title: `${title} | E20FIP`,
    description: `${title}`,
    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/list/${title}`
    }
  }
}

async function getData(query) {
  let skip = 0
  if (query.pageNum !== null && !isNaN(query.pageNum)) {
    skip = query.pageNum * limit - limit
  }

  try {
    await connectTodb()
    const datas = Category.findOne({ title: query.category })
      .then(async (cat) => {
        //if (!cat) return
        const count = await Blog.countDocuments({
          category: cat._id
        })
        const blogs = await Blog.find({ category: cat._id })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .select("_id title description createdAt")
          .lean()
        return {
          datas: JSON.parse(JSON.stringify(blogs)),
          catPicture: cat.picture,
          catTitle: cat.title,
          count: Math.ceil(count / limit)
        }
      })
      .catch(() => {
        return false
      })
    return datas
  } catch (e) {
    console.log({ error: e })
    return false
  }
}

export default async function List({ params }) {
  const category = params.slug[0].toLowerCase()
  const pageNum = params.slug[1] || null

  const result = await getData({ category: category, pageNum: pageNum })
  if (!result) return notFound()
  const { datas, catPicture, catTitle, count } = result
  return (
    <>
      <div className="content">
        <div className="content_colume">
          {datas?.map((data, index) => (
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
                    priority={index == 0 ? true : false}
                  />
                </div>
                <div className="title">
                  <Link href={`/post/${data._id}`}>{data.title}</Link>
                </div>
                <div className="info">
                  <span>{catTitle}</span>
                  <Date dateString={data.createdAt} />
                </div>
              </li>
              <li>
                <LimitText longText={data.description} limit="150" />
              </li>
            </ul>
          ))}
        </div>
      </div>
      {count !== 1 && <Pagination path={`/list/${catTitle}`} count={count} />}
    </>
  )
}
