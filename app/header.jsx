import Link from 'next/link'

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
            <li key={link.name}>
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
export default Header
