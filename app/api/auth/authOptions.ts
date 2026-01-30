import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials")
            return null
          }

          // Trim whitespace from credentials
          const email = credentials.email.trim()
          const password = credentials.password.trim()

          // 🔴 TEMP MOCK USER (replace with DB later)
          const mockUser = {
            id: "1",
            name: "John Doe",
            email: credentials?.email,
            password: credentials?.password,
            role: "admin",
          }

          console.log("Attempting login:", { email, passwordMatch: password === mockUser.password })

          if (email === mockUser.email && password === mockUser.password) {
            console.log("Login successful")
            return {
              id: mockUser.id,
              name: mockUser.name,
              email: mockUser.email,
              role: mockUser.role,
            }
          }

          console.log("Invalid credentials")
          return null
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string
        (session.user as any).role = token.role as string
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
