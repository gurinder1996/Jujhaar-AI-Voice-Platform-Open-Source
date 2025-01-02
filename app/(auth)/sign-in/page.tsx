"use client"

import { AuthForm } from "@/components/auth/auth-form"

export default function SignInPage() {
  return (
    <div className="container relative flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <AuthForm />
      </div>
      <div className="absolute right-8 top-8">
        <div className="text-2xl font-bold text-primary">
          Save thousands of hours on the phone
        </div>
        <div className="mt-2 text-xl">
          Get setup in <span className="text-pink-500">minutes</span>
        </div>
      </div>
    </div>
  )
}
