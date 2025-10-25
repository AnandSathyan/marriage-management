import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getActivityLogs } from '@/lib/activityLog'
import ActivityLogsList from '@/components/ActivityLogsList'

export default async function LogsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  // Only admins can access logs
  if ((session.user as any)?.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const logs = await getActivityLogs({ limit: 500 })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📊 Activity Logs
          </h1>
          <p className="text-gray-600">Track all user activities and system changes</p>
        </div>
        <ActivityLogsList logs={logs} />
      </div>
    </div>
  )
}
