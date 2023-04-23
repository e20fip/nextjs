'use client'
import Link from 'next/link'
import pathName from '@/lib/getPathname'

const links = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' }
]

const active = (name) => {
  const path = pathName()
  return path == name ? { backgroundColor: '#f1f1f1' } : {}
}

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.name} style={active(link.path)}>
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
export default Header
