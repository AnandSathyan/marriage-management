import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import ProfilesList from '@/components/ProfilesList'

export default async function ProfilesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const profiles = await prisma.profile.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
          followUps: true,
        },
      },
    },
  })

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Profiles</h1>
              <p className="text-gray-600 mt-1">Manage all marriage profiles</p>
            </div>
            <a
              href="/profiles/new"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
            >
              + Add New Profile
            </a>
          </div>
          {profiles.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📇</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Profiles Yet</h3>
              <p className="text-gray-600 mb-6">Get started by adding your first profile</p>
              <a
                href="/profiles/new"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Add Your First Profile
              </a>
            </div>
          ) : (
            <ProfilesList profiles={profiles} />
          )}
        </div>
      </div>
    </>
  )
}
