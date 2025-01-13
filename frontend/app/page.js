"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function BackgroundGradientAnimationDemo() {
  const router = useRouter();

  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl">
        <div className="flex">
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            CodeHints
          </p>
          <span>💡</span>
        </div>
        <button
          className="mt-4 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-all focus:ring-offset-slate-50"
          onClick={() => router.push("/login")}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex text-xl h-full w-full cursor-pointer items-center justify-center font-semibold rounded-full bg-slate-950 px-7 hover:bg-slate-800 py-1 text-white backdrop-blur-3xl">
            Get Started
          </span>
        </button>
      </div>
    </BackgroundGradientAnimation>
  );
}
