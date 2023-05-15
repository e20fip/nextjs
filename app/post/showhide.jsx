'use client'

import { useState } from 'react'

const Showhide = ({ children }) => {
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      <div className="post_showhide" onClick={() => setIsShow((prev) => !prev)}>
        <Menu isShow={isShow} />
      </div>
      <div
        className="post_sidemenu"
        style={activeStyle(isShow)}
        onClick={() => setIsShow((prev) => !prev)}
      >
        {children}
      </div>
      <div className="post_sidemenu_full">{children}</div>
    </>
  )
}

const activeStyle = (isShow) => {
  return isShow === true
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
      {isShow && <span className="post_rotate">&#10140;</span>}
    </>
  )
}

export default Showhide
