'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslation } from '@/hooks/useTranslation'

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { t } = useTranslation()
  const user = session?.user as any

  const menuItems = [
    {
      label: t('dashboard.title'),
      href: '/dashboard',
      icon: '📊',
    },
    {
      label: t('profiles.title'),
      href: '/profiles',
      icon: '👥',
    },
    ...(user?.role === 'ADMIN' ? [
      {
        label: t('users.title'),
        href: '/users',
        icon: '👤',
      },
      {
        label: 'Activity Logs',
        href: '/logs',
        icon: '📋',
      },
    ] : []),
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname?.startsWith(href)
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive(item.href)
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
              }
            `}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Quick Actions */}
      {user?.role === 'ADMIN' && (
        <div className="p-4 border-t border-gray-200 mt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Quick Actions</p>
          <div className="space-y-1">
            <Link
              href="/profiles/new"
              className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <span>➕</span>
              <span className="text-sm">Add Profile</span>
            </Link>
            <Link
              href="/users/new"
              className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <span>👤</span>
              <span className="text-sm">Add User</span>
            </Link>
            <Link
              href="/logs"
              className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
            >
              <span>📋</span>
              <span className="text-sm">Activity Logs</span>
            </Link>
          </div>
        </div>
      )}
    </aside>
  )
}
