import NextAuth, { type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Adresse mail", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const query = `
            mutation Login($loginInput: LoginInput!) {
              login(loginInput: $loginInput) {
                accessToken
                user {
                  id
                  email
                  username
                  role
                }
              }
            }
          `;

          const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/graphql",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query,
                variables: {
                  loginInput: { email, password },
                },
              }),
            },
          );

          const result = await response.json();

          if (result.errors || !result.data?.login) {
            return null;
          }

          const { accessToken, user } = result.data.login;

          return {
            id: user.id,
            email: user.email,
            name: user.username,
            role: user.role,
            accessToken: accessToken,
          } as User;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as { accessToken: string; role: string };
        token.accessToken = u.accessToken;
        token.role = u.role;
        token.id = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        const s = session.user as unknown as {
          accessToken: string;
          role: string;
          id: string;
        };
        s.accessToken = token.accessToken as string;
        s.role = token.role as string;
        s.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
});
