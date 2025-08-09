import Link from 'next/link'
import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Home, NotebookText, Settings, User } from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-dvh w-dvw grid grid-cols-[260px_1fr]">
      <aside className="border-r bg-background flex flex-col">
        <div className="px-4 py-6">
          <Link href="/dashboard" className="font-semibold text-lg">
            Serif Dashboard
          </Link>
        </div>
        <nav className="flex-1 px-3 space-y-2">
          <NavItem href="/dashboard" label="Home" icon={<Home className="h-4 w-4" />} />
          <NavItem href="/dashboard/blogs" label="Blogs" icon={<NotebookText className="h-4 w-4" />} />
          <NavItem href="/dashboard/setting" label="Setting" icon={<Settings className="h-4 w-4" />} />
        </nav>
        <div className="mt-auto p-3 border-t">
          <NavItem
            href="/dashboard/account"
            label="Account"
            variant="secondary"
            icon={<User className="h-4 w-4" />}
          />
        </div>
      </aside>
      <main className="min-h-0 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

interface NavItemProps {
  href: string
  label: string
  variant?: 'default' | 'secondary' | 'ghost'
  icon?: React.ReactNode
}

function NavItem({ href, label, variant = 'ghost', icon }: NavItemProps) {
  return (
    <Button asChild variant={variant} className={cn('w-full justify-start gap-2')}>
      <Link href={href}>
        <span className="inline-flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </span>
      </Link>
    </Button>
  )
}


