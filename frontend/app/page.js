"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";

export default function BackgroundGradientAnimationDemo() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/problems");
  };

  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          CodeHints⚡
        </p>
        <Button className="text-2xl m-4" size="lg" onClick={handleClick}>
          Go to Problems
        </Button>
      </div>
    </BackgroundGradientAnimation>
  );
}
