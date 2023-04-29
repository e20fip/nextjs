'use client'
import postStyles from '@/app/post/post.module.css'
import { useState } from 'react'

const Showhide = ({ children }) => {
  const [isShow, setIsShow] = useState(null)

  return (
    <>
      <div
        className={postStyles.showhide}
        onClick={() => setIsShow((prev) => !prev)}
      >
        <Menu isShow={isShow} />
      </div>
      <div className={postStyles.sidemenu} style={activeStyle(isShow)}>
        {children}
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

const Menu = ({ isShow }) => {
  return (
    <>
      {!isShow && <span>&#10140;</span>}
      {isShow && <span className={postStyles.rotate}>&#10140;</span>}
    </>
  )
}

export default Showhide
