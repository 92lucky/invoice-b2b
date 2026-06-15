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
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;

      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!dbUser) return true;

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
      // hanya jalan saat login pertama
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.email = dbUser.email;
        }
      }

      if (token.id) {
        const profile = await prisma.appProfile.findUnique({
          where: { userId: token.id as string },
          select: { id: true },
        });

        token.profileCompleted = !!profile;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.profileCompleted = token.profileCompleted as boolean;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET!,
});
