import { Sarabun } from 'next/font/google'
import Header from './header'
import Footer from './footer'
import './globals.css'
import Provider from '@/app/components/Provider'

export const metadata = {
  title: 'E20FIP',
  description: 'Web Development'
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
          <Provider>
            <Header />
            <div className="container">{children}</div>
            <Footer />
          </Provider>
        </main>
      </body>
    </html>
  )
}
