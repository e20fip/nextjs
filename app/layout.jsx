import Header from './header'
import Footer from './footer'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <Header />
          <div className="container">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
