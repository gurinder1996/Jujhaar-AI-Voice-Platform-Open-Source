import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { AuthGuard } from '@/components/auth/auth-guard'
import { Sidebar } from '@/components/sidebar'
import { TopNav } from '@/components/top-nav'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Voice AI Daddy',
  description: 'An open source AI voice assistant platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
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
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}