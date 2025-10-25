import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import UsersList from '@/components/UsersList'

export default async function UsersPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const user = session.user as any
  if (user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage family members and their access</p>
            </div>
            <a
              href="/users/new"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
            >
              + Add New User
            </a>
          </div>
          <UsersList users={users} />
        </div>
      </div>
    </>
  )
}
