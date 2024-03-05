"use client"

import { useState } from "react"
import pathName from "@/lib/getPathname"
import Link from "next/link"
import LimitText from "@/lib/texttrim"

const Sidemenu = ({ lists }) => {
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      <div className="post_showhide" onClick={() => setIsShow((prev) => !prev)}>
        <Menu isShow={isShow} />
      </div>
      <div className={`${isShow ? "post_sidemenu" : "post_sidemenu mobile"}`}>
        <ul className="post_listmenu">
          {lists.map((list) => (
            <li key={list._id} className={active(`/post/${list._id}`)}>
              <Link href={`/post/${list._id}`} className="post_link">
                {list.title.substring(0, 30)}
              </Link>
              <div className="small_info">
                <LimitText longText={list.description} limit="60" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const Menu = ({ isShow }) => {
  return (
    <>
      {!isShow && <span>&#10140;</span>}
      {isShow && <span className="post_rotate">&#10140;</span>}
    </>
  )
}

const active = (link) => {
  const path = pathName()
  return link === path ? "active" : ""
}

export default Sidemenu
