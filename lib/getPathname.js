import { usePathname } from 'next/navigation'

const pathName = () => {
  const path = usePathname()
  return path
}

export default pathName
