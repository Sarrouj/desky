import NextAuth, { NextAuthOptions } from "next-auth";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
              email: user.email ?? "",
              name: user.name ?? "",
            }
          );

          if (response.status === 200) {
            if (response.data.success === "Registered successfully") {
              return `/process-google-signIn?email=${encodeURIComponent(
                user.email ?? ""
              )}&password=${encodeURIComponent(
                (user.name ?? "") + (user.email ?? "")
              )}`;
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
      if (url.startsWith("/auth/process-google-signIn")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }

      if (account?.provider === "google") {
        try {
          const response = await axios.post(
            "http://localhost:3001/auth/google",
            {
              name: profile?.name ?? "",
              email: profile?.email ?? "",
            }
          );

          if (response.status === 200 && response.data) {
            token.id = response.data.id;
            token.email = response.data.email;
          } else {
            throw new Error("Failed to register user with Google");
          }
        } catch (error) {
          console.error("Google registration error:", error);
          throw new Error("Google registration failed");
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.email = token.email;
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
