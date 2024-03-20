import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { mockApiRequest } from "@/mockForTests/mockApiRequest";
import { API_ROUTE } from "../../../../../API_ROUTE";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Sign in",

      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
        token: { type: "string", required: true },
        id: { type: "string" },
        secret: { type: "string", required: true },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const res = await fetch(`${API_ROUTE}/v1/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentials.token}`,
          },
        });

        if (!res.ok) {
          return null;
        }

        return credentials;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
});

export { handler as GET, handler as POST };
