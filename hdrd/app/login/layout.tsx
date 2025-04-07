import type React from "react"

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="h-screen w-screen overflow-hidden">{children}</div>
}

