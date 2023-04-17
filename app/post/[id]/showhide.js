'use client'
import postStyles from '@/app/post/post.module.css'
import { useState } from 'react'

const Showhide = () => {
  const [isShow, setIsShow] = useState(null)

  return (
    <div
      className={postStyles.showhide}
      onClick={() => setIsShow((prev) => !prev)}
    >
      <Menu isShow={isShow} />
    </div>
  )
}

const Menu = ({ isShow }) => {
  if (isShow === true) {
    document.getElementById('sidemenu').style.cssText =
      'transform: translateX(0);transition: transform 1s ease-in-out;'
  } else if (isShow === false) {
    document.getElementById('sidemenu').style.cssText =
      'transform: translateX(-350px);transition: transform 1s ease-in-out;'
  }

  return (
    <>
      {!isShow && <span>&#10140;</span>}
      {isShow && <span className={postStyles.rotate}>&#10140;</span>}
    </>
  )
}

export default Showhide
