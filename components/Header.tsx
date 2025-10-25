'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const { t } = useTranslation()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  const user = session?.user

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            💍 MarriagePro
          </Link>
          <nav className="flex items-center space-x-1">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
            >
              {t('dashboard.title')}
            </Link>
            <Link
              href="/profiles"
              className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
            >
              {t('profiles.title')}
            </Link>
            {(user as any)?.role === 'ADMIN' && (
              <Link
                href="/users"
                className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
              >
                {t('users.title')}
              </Link>
            )}
            <div className="ml-4 flex items-center space-x-4 pl-4 border-l border-gray-300">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500">{(user as any)?.language === 'MALAYALAM' ? 'മലയാളം' : 'English'}</div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium"
              >
                {t('common.logout')}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
