"use client";

import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPasword: "",
  });
  return (
    <div className="flex justify-center items-center h-screen bg-gray-950 dark ">
      <div>
        <BackgroundGradient className="rounded-[22px] w-[25vw]  p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <div className="flex flex-col text-white">
            <div className="justify-center items-center w-full flex flex-col ">
              <h1 className="font-bold text-3xl my-4">CodeHints💡</h1>
              <h1 className="font-bold  justify-center text-xl">Signup</h1>
            </div>
            <div className="flex mt-8 flex-col gap-y-5">
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <Button>🔑 Signup</Button>
              <Button onClick={() => router.push("/login")}>
                🆕 Already have an account
              </Button>
            </div>
          </div>
        </BackgroundGradient>
      </div>
    </div>
  );
};

export default page;
