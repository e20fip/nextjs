'use client'
import postStyles from '@/app/post/post.module.css'
import Link from 'next/link'
import { useState } from 'react'
import Date from '@/lib/date'
import pathName from '@/lib/getPathname'

const Showhide = ({ notes }) => {
  const [isShow, setIsShow] = useState(null)
  const path = pathName()

  return (
    <>
      <div
        className={postStyles.showhide}
        onClick={() => setIsShow((prev) => !prev)}
      >
        <Menu isShow={isShow} />
      </div>
      <div
        id="sidemenu"
        className={postStyles.sidemenu}
        style={activeStyle(isShow)}
      >
        <ul className={postStyles.listmenu}>
          {notes?.map((note) => (
            <li key={note._id} style={activeUrl(note._id)}>
              <Link
                href={`post/${note._id}`}
                className={postStyles.link}
                prefetch={false}
              >
                {note.title.substring(0, 30)}
              </Link>
              <Date dateString={note.createdAt} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const activeStyle = (isShow) => {
  return isShow === null
    ? {}
    : isShow === true
    ? {
        transform: 'translateX(0)',
        transition: 'transform 1s ease-in-out'
      }
    : {
        transform: 'translateX(-350px)',
        transition: 'transform 1s ease-in-out'
      }
}

const activeUrl = (url) => {
  const path = `/post/${url}`
  const current = pathName()

  return path === current ? { backgroundColor: '#E9EDC9' } : {}
}

const Menu = ({ isShow }) => {
  return (
    <>
      {!isShow && <span>&#10140;</span>}
      {isShow && <span className={postStyles.rotate}>&#10140;</span>}
    </>
  )
}

export default Showhide
