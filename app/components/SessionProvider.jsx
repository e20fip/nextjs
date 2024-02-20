"use client"
import { SessionProvider } from "next-auth/react"
export default function SessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}
