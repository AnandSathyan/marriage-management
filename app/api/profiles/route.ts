import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { logActivity } from '@/lib/activityLog'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    const profile = await prisma.profile.create({
      data: {
        name: data.name,
        fathersName: data.fathersName || null,
        nakshathram: data.nakshathram || null,
        age: data.age,
        education: data.education,
        occupation: data.occupation,
        location: data.location,
        contact: data.contact || null,
        bio: data.bio || null,
        photos: data.photos.filter((p: string) => p.trim() !== ''),
        addedBy: (session.user as any).id,
      },
    })

    // Log activity
    await logActivity({
      action: 'CREATE',
      entityType: 'PROFILE',
      entityId: profile.id,
      userId: (session.user as any).id,
      details: { profileName: profile.name },
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error creating profile:', error)
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
  }
}
