"use client"
import Link from "next/link"
import pathName from "@/lib/getPathname"
import SignIn from "@/app/components/SignIn"
import Image from "next/image"

const links = [
  { name: "HOME", path: "/" },
  { name: "GEMINI", path: "/gemini" },
  { name: "ABOUT", path: "/about" }
]

const Header = () => {
  return (
    <header>
      <Image
        src="/images/logo.png"
        width={203}
        height={114}
        className="logo"
        alt="logo"
        priority
      />
      <nav>
        <ul className="menu">
          {links.map((link) => (
            <li key={link.name} style={active(link.path)}>
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <ul className="profileBox">
          <li>
            <SignIn />
          </li>
        </ul>
      </nav>
    </header>
  )
}

const active = (link) => {
  const path = pathName()
  return link === path ? { backgroundColor: "var(--active)" } : {}
}
export default Header
