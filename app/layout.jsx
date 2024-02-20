import { Prompt } from "next/font/google"
import Header from "./header"
import Footer from "./footer"
import "./globals.css"
import SessionProvider from "./components/SessionProvider"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

export const metadata = {
  title: "E20FIP",
  description: "Web Development"
}

const CustomFont = Prompt({
  subsets: ["thai"],
  weight: ["100", "400"]
})

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
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
