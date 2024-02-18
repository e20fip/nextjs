import { Prompt } from "next/font/google"
import Header from "./header"
import Footer from "./footer"
import "./globals.css"
import { getServerSession } from "next-auth"
import SessionProvider from "./components/SessionProvider"

export const metadata = {
  title: "E20FIP",
  description: "Web Development"
}

const CustomFont = Prompt({
  subsets: ["thai"],
  weight: ["100", "400"]
})

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang="th">
      <body style={CustomFont.style}>
        <main>
          <SessionProvider session={session}>
            <Header />
            {children}
            <Footer />
          </SessionProvider>
        </main>
      </body>
    </html>
  )
}
