import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import AddProfileForm from '@/components/AddProfileForm'
import { notFound } from 'next/navigation'

export default async function EditProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const profile = await prisma.profile.findUnique({
    where: { id: params.id },
  })

  if (!profile) {
    notFound()
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="px-6 py-8 ml-64">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>
            <AddProfileForm userId={session.user!.id!} existingProfile={profile} />
          </div>
        </div>
      </div>
    </>
  )
}
