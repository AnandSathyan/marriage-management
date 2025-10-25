import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import DashboardStats from '@/components/DashboardStats'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const stats = await prisma.profile.groupBy({
    by: ['status'],
    _count: true,
  })

  const totalProfiles = await prisma.profile.count()
  
  const statsMap = {
    NEW: 0,
    PENDING: 0,
    ACCEPTED: 0,
    REJECTED: 0,
  }

  stats.forEach((stat) => {
    statsMap[stat.status as keyof typeof statsMap] = stat._count
  })

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {session.user?.name}! 👋
            </h1>
            <p className="text-gray-600">Here&apos;s an overview of your marriage profiles</p>
          </div>
          <DashboardStats
            totalProfiles={totalProfiles}
            newProfiles={statsMap.NEW}
            pendingProfiles={statsMap.PENDING}
            acceptedProfiles={statsMap.ACCEPTED}
            rejectedProfiles={statsMap.REJECTED}
          />
        </div>
      </div>
    </>
  )
}
