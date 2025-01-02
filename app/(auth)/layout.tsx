import Image from "next/image"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="relative h-10 w-10 mb-8">
            <Image
              src="/logo.svg"
              alt="Phonely Logo"
              fill
              className="object-contain"
            />
          </div>
          {children}
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="flex h-full flex-col items-center justify-center px-8">
            <h1 className="text-4xl font-semibold text-purple-900 mb-4">
              Save thousands of hours on the phone
            </h1>
            <p className="text-xl text-purple-900">
              Get setup in <span className="text-pink-500">minutes</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
