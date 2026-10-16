"use client";

import { signIn } from "next-auth/react";

export function KickLoginButton({ className = "" }: { className?: string }) {
  return (
    <button
      onClick={() => signIn("kick")}
      className={`cursor-pointer text-black flex gap-2 items-center bg-[#53FC18] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#4ae015] transition-all ease-in duration-200 ${className}`}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 fill-black">
        <path d="M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z" />
      </svg>
      Login with Kick
    </button>
  );
}
