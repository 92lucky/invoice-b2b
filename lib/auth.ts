import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;

      // 🔍 FIND USER
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!dbUser) return true;

      // 🔁 UPSERT SUBSCRIPTION
      await prisma.subscription.upsert({
        where: { userId: dbUser.id },
        create: {
          userId: dbUser.id,
          plan: "free",
          status: "TRIAL",
          trialEnd: new Date(Date.now() + 5 * 60 * 1000),
        },
        update: {},
      });

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET!,
});
