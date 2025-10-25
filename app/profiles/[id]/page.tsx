import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import ProfileDetails from '@/components/ProfileDetails'
import { notFound } from 'next/navigation'

export default async function ProfileDetailPage({
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
    include: {
      user: {
        select: {
          name: true,
        },
      },
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
      followUps: {
        orderBy: {
          createdAt: 'desc',
        },
      },
      editHistory: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          editor: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  })

  if (!profile) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ProfileDetails profile={profile} userId={session.user!.id!} />
      </div>
    </div>
  )
}
