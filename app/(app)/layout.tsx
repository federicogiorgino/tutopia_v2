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
        {children}
      </NuqsAdapter>
    </>
  )
}

export default AppLayout
