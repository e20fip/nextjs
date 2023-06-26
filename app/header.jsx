'use client'
import Link from 'next/link'
import pathName from '@/lib/getPathname'
import SignIn from '@/app/components/SignIn'

const links = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' }
]

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
        <ul>
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
  return link === path ? { backgroundColor: 'var(--active)' } : {}
}
export default Header
