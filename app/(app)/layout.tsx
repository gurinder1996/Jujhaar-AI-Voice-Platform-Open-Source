import { AuthGuard } from "@/components/auth/auth-guard"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1">
          <TopNav />
          <main className="min-h-screen bg-background px-8 py-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
