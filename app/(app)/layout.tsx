"use client"

import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { AgentProvider } from "@/contexts/agent-context"
import { Toaster } from "@/components/ui/toaster"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log('No session found, redirecting to sign-in')
      router.push('/sign-in')
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <AgentProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNav />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </AgentProvider>
  )
}
