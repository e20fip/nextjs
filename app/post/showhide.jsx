'use client'

import { useState } from 'react'

const Showhide = ({ children }) => {
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      <div className="post_showhide" onClick={() => setIsShow((prev) => !prev)}>
        <Menu isShow={isShow} />
      </div>
      <div className={`${isShow ? 'post_sidemenu' : 'post_sidemenu mobile'}`}>
        {children}
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

export default Showhide
