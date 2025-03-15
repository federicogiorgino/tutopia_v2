import React from 'react'

type AuthFormWrapperProps = {
  children: React.ReactNode
}

function AuthFormWrapper({ children }: AuthFormWrapperProps) {
  return <div className="flex w-full max-w-md flex-col gap-6">{children}</div>
}

export { AuthFormWrapper }
