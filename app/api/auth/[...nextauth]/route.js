import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import User from "@/models/user"

import { connectTodb } from "@/lib/database"

function checkUser(email) {
  let role = "user"
  if (email === process.env.ADMIN_EMAIL) role = "admin"
  return role
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        const userRole = checkUser(profile?.email)
        return {
          ...profile,
          provider: "google",
          id: profile.sub,
          role: userRole,
          image: profile.picture
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        const userRole = checkUser(profile?.email)
        return {
          ...profile,
          provider: "github",
          id: profile.id,
          role: userRole,
          image: profile.avatar_url
        }
      }
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        const userRole = checkUser(profile?.email)
        await connectTodb()
        const userExists = await User.findOne({
          email: profile.email
        })
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name,
            role: userRole,
            image: profile.picture || profile.avatar_url
          })
        }
        return true
      } catch (error) {
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.image = token.picture
      session.user.role = token.role
      return session
    }
  },
  theme: {
    colorScheme: "dark",
    logo: `${process.env.NEXTAUTH_URL}/images/logo.png`
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
