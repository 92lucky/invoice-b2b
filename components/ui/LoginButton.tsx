"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="
        w-16 h-16
        rounded-2xl
        bg-white
        hover:scale-105
        transition
        flex items-center justify-center
        shadow-xl
      "
    >
      <FcGoogle size={32} />
    </button>
  );
}
