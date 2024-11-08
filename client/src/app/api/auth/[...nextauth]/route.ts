import NextAuth, {
  NextAuthOptions,
  DefaultSession,
  User as NextAuthUser,
} from "next-auth";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the default session interface
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
}

// Extend the JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    exp: number;
  }
}

const authOptions: NextAuthOptions = {
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
            `${process.env.NEXT_PUBLIC_BackendURL}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          if (response.status === 200 && response.data) {
            return {
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
              role: response.data.role,
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
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BackendURL}/auth/google`,
            {
              email: user.email ?? "",
              name: user.name ?? "",
            }
          );

          if (response.status === 200) {
            if (response.data.success === "Registered successfully") {
              return `/fr/process-google-signIn?email=${encodeURIComponent(
                user.email ?? ""
              )}&password=${encodeURIComponent(
                (user.name ?? "") + (user.email ?? "")
              )}`;
            }
            if (response.data.success === "Login successfully") {
              user.id = response.data.id;
              user.name = response.data.name;
              user.email = response.data.email;
              user.role = response.data.role;
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
      return url;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }

      if (account?.provider === "google") {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BackendURL}/auth/google`,
            {
              name: profile?.name ?? "",
              email: profile?.email ?? "",
            }
          );

          if (response.status === 200 && response.data) {
            token.id = response.data.id;
            token.name = response.data.name;
            token.email = response.data.email;
            token.role = response.data.role;
          } else {
            throw new Error("Failed to register user with Google");
          }
        } catch (error) {
          console.error("Google registration error:", error);
          throw new Error("Google registration failed");
        }
      }

      const expirationTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
      token.exp = expirationTime;

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
        };
        session.expires = new Date(token.exp * 1000).toISOString();
      }
      return session;
    },
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 1 week in seconds
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
