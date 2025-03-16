import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Dialogs } from '@/components/dialogs'
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
        <main className="container mx-auto">
          <Dialogs />
          {children}
        </main>
      </NuqsAdapter>
    </>
  )
}

export default AppLayout
