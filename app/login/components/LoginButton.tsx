"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

interface LoginButtonProps {
  disabled?: boolean;
}

export default function LoginButton({ disabled = false }: LoginButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="
        w-16 h-16
        rounded-2xl
        bg-white
        hover:scale-105
        transition
        flex items-center justify-center
        shadow-xl
        disabled:opacity-50
        disabled:hover:scale-100
        disabled:cursor-not-allowed
      "
    >
      <FcGoogle size={32} />
    </button>
  );
}
