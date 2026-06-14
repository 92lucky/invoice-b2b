"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button onClick={() => signIn("google", { callbackUrl: "/login" })}>
        Login Google
      </button>
    );
  }

  return (
    <div>
      <p>Login sebagai: {session.user?.email}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
