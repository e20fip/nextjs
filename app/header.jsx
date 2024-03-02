"use client"
import Link from "next/link"
import pathName from "@/lib/getPathname"
import SignIn from "@/app/components/SignIn"
import Image from "next/image"
import { useState } from "react"

const links = [
  { name: "Home", path: "/" },
  { name: "JavaScript", path: "/list/javascript" },
  { name: "css", path: "/list/css" },
  { name: "GEMINI", path: "/gemini" },
  { name: "ABOUT", path: "/about" }
]

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false)
  return (
    <header>
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={203}
          height={114}
          className="logo"
          alt="logo"
          priority
        />
      </Link>
      <div
        className="menuToggle"
        onClick={() => setIsShowMenu((prev) => !prev)}
      >
        Menu
      </div>
      {
        <nav style={{ display: isShowMenu ? "flex" : "none" }}>
          <ul className="menu">
            {links.map((link) => (
              <li key={link.name} style={active(link.path)}>
                <Link
                  href={link.path}
                  onClick={() => setIsShowMenu((prev) => !prev)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      }
      <div className="profileBox">
        <SignIn />
      </div>
    </header>
  )
}

const active = (link) => {
  const path = pathName()
  return link === path ? { backgroundColor: "var(--active)" } : {}
}
export default Header
