"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface AuthFormProps {
  className?: string
}

export function AuthForm({ className }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isSignIn, setIsSignIn] = useState(true)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (isSignIn) {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.error) {
          setError(result.error)
          return
        }

        // Get the callback URL from the query parameters or default to dashboard
        const searchParams = new URLSearchParams(window.location.search)
        const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
        router.push(callbackUrl)
      } else {
        const { error: signUpError, data } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              email_confirmed: true
            }
          },
        })

        if (signUpError) {
          setError(signUpError.message)
          return
        }

        // Automatically sign in after sign up
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.error) {
          setError(result.error)
          return
        }

        router.push("/dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-md space-y-8", className)}>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isSignIn ? "Sign into your account" : "Create your account"}
        </h1>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        {error && (
          <div className="text-sm text-destructive">{error}</div>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <></>
          ) : isSignIn ? (
            'Sign in'
          ) : (
            'Sign up'
          )}
        </Button>

        {!isSignIn && (
          <Button
            variant="link"
            className="px-0 font-normal"
            onClick={() => router.push('/forgot-password')}
          >
            Forgot password?
          </Button>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {isSignIn ? 'Don\'t have an account?' : 'Already have an account?'}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn ? 'Sign up' : 'Sign in'}
        </Button>
      </div>
    </form>
  )
}
