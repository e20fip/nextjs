import { Kanit } from "next/font/google"
import Header from "./header"
import Footer from "./footer"
import "./globals.css"
import Provider from "./components/sessionProvider"

export const metadata = {
  title: "HOME | E20FIP",
  description: "Web Development",
  /*   openGraph: {
    title: "E20FIP",
    description: "Web Development"
  }, */
  alternates: {
    canonical: `${process.env.NEXTAUTH_URL}`
  }
}

const CustomFont = Kanit({
  subsets: ["thai"],
  weight: ["200", "300", "500"]
})

export default async function RootLayout({ children }) {
  return (
    <html lang="th">
      <body style={CustomFont.style}>
        <main>
          <Provider>
            <Header />
            {children}
            <Footer />
          </Provider>
        </main>
      </body>
    </html>
  )
}
