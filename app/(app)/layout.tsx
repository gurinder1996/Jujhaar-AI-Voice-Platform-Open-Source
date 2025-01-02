import { AuthGuard } from "@/components/auth/auth-guard"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <TopNav />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
