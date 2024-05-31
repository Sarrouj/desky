import NextAuth, { NextAuthOptions } from "next-auth";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the NextAuth types
declare module "next-auth" {
  interface Session {
    id?: string;
    email?: string;
  }

  interface User {
    id?: string;
    email?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
  }
}

// Configure NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "http://localhost:3001/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          if (response.status === 200 && response.data) {
            return {
              id: response.data.id,
              email: response.data.email,
            };
          } else {
            throw new Error("Invalid login credentials");
          }
        } catch (error) {
          throw new Error("Login failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        try {
          const response = await axios.post(
            "http://localhost:3001/auth/google",
            {
              email: user.email,
              name: user.name,
            }
          );

          if (response.status === 200) {
            if (response.data.success === "Registered successfully") {
              return `/Sign-Up/choose-type`;
            }
            if (response.data.success === "Login successful") {
              user.id = response.data.id;
              return true;
            }
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url === "/Sign-Up/choose-type") {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
