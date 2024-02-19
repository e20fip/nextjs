import { Prompt } from "next/font/google"
import Header from "./header"
import Footer from "./footer"
import "./globals.css"
import Provider from "./components/SessionProvider"

export const metadata = {
  title: "E20FIP",
  description: "Web Development"
}

const CustomFont = Prompt({
  subsets: ["thai"],
  weight: ["100", "400"]
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
