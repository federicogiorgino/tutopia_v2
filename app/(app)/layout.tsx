import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Navbar } from '@/components/navbar'

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <NuqsAdapter>
        <Navbar />
        <main className="container mx-auto">{children}</main>
      </NuqsAdapter>
    </>
  )
}

export default AppLayout
