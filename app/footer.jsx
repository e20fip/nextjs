import Image from 'next/image'
export default function Footer() {
  return (
    <footer>
      <div className="link-bottom">
        <a href="https://www.nextjs.org">
          <Image src="/images/next.svg" width={70} height={10} alt="nextjs" />
        </a>{' '}
        <a href="https://www.vercel.com">
          <Image src="/images/vercel.svg" width={70} height={10} alt="vercel" />
        </a>
      </div>
    </footer>
  )
}
