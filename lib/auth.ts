import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { getTrialEndDate } from "@/lib/payment/subscription/duration";

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
    strategy: "database",
  },

  callbacks: {
    async session({ session, user }) {
      if (!session.user) return session;

      session.user.id = user.id;

      const profile = await prisma.appProfile.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      session.user.profileCompleted = !!profile;

      return session;
    },
  },

  events: {
    async createUser({ user }) {
      if (!user.id) {
        throw new Error("User ID is missing");
      }

      await prisma.subscription.create({
        data: {
          plan: "free",
          status: "trial",
          trialEnd: getTrialEndDate(),

          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
