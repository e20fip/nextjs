import { Sarabun } from 'next/font/google'
import Header from './header'
import Footer from './footer'
import './globals.css'

export const metadata = {
  title: 'myapp',
  description: 'learn nextjs'
}

const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['400', '600']
})

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body style={sarabun.style}>
        <main>
          <Header />
          <div className="container">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
