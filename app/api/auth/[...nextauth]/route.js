import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import User from "@/models/user"

import { connectTodb } from "@/lib/database"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        let userRole = "user"
        if (profile?.email === process.env.ADMIN_EMAIL) userRole = "admin"

        return {
          ...profile,
          id: profile.sub,
          role: userRole
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        let userRole = "user"
        return {
          ...profile,
          role: userRole
        }
      }
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      //console.log(profile)
      try {
        await connectTodb()
        const userExists = await User.findOne({
          email: profile.email
        })

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.toLowerCase(),
            role: profile.role,
            image: profile.picture
          })
        }
        return true
      } catch (error) {
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) (token.picture = user.picture), (token.role = user.role)
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.image = token.picture
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
