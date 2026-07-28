"use client";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="
        w-full
        text-left
        p-3
        rounded-xl
        hover:bg-red-500/10
        hover:text-red-400
        transition
      "
    >
      Log Out
    </button>
  );
}
