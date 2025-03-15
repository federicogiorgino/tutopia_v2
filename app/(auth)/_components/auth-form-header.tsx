import { Icons } from '@/components/ui/icons'

type AuthFormHeaderProps = {
  title: string
  description?: string
}

function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Icons.logo className="h-20 w-20 text-primary" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{title}</h1>

        <p className="text-balance text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

export { AuthFormHeader }
