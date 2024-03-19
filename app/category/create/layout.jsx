import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"
export default async function CategoryLayout({ children, file, category }) {
  const session = await getServerSession(authOptions)
  if (!session || session?.user.role !== "admin") {
    return redirect("/")
  }
  return (
    <>
      <div className="content">{children}</div>
      <div className="content">
        <div className="button-container">
          <Link href="/category/create/upload">Upload</Link>
          <Link href="/category/create">List</Link>
        </div>
        {file}
      </div>
      <div className="content">{category}</div>
    </>
  )
}
