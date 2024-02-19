"use client"
import { SessionProvider } from "next-auth/react"
export default function Provider({ children }) {
  return <SessionProvider refetchInterval={5 * 60}>{children}</SessionProvider>
}
