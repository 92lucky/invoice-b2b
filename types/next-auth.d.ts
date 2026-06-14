import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;

      // tambahkan profileCompleted
      profileCompleted: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string | null;
    profileCompleted?: boolean;

    // opsional, simpan juga profileCompleted di token
    profileCompleted?: boolean;
  }
}
