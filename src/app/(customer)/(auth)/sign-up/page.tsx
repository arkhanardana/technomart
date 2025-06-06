"use client";

import { initialState } from "@/types";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "../lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
    >
      {pending ? "Loading..." : "Create My Account"}
    </button>
  );
}

export default function SignUpPage() {
  const [state, formAction] = useFormState(signUp, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      id="signin"
      className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col"
    >
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <form
          action={formAction}
          className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
        >
          <div className="flex justify-center">
            <Image
              src="assets/logos/logo-black.svg"
              alt="logo"
              width={140}
              height={140}
            />
          </div>
          <h1 className="font-bold text-2xl leading-[34px]">Sign Up</h1>

          {state.error !== "" && (
            <div className="pb-4">
              <Alert variant="destructive" className="rounded-xl">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <Image
                src="assets/icons/profile-circle.svg"
                alt="icon"
                width={17}
                height={17}
              />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
              placeholder="Write your complete name"
            />
          </div>
          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <Image
                src="assets/icons/sms.svg"
                alt="icon"
                width={17}
                height={17}
              />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
              placeholder="Write your email address"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <Image
                  src="assets/icons/lock.svg"
                  alt="icon"
                  width={17}
                  height={17}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Write your password"
              />
              <button
                type="button"
                className="flex shrink-0"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <SubmitButton />
            <Link
              href="/sign-in"
              className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
