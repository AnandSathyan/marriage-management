import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { logActivity } from '@/lib/activityLog'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    const followUp = await prisma.followUp.create({
      data: {
        content: data.content,
        scheduledDate: data.scheduledDate ? new Date(data.scheduledDate) : null,
        profileId: params.id,
      },
    })

    // Log activity
    await logActivity({
      action: 'CREATE',
      entityType: 'FOLLOWUP',
      entityId: followUp.id,
      userId: (session.user as any).id,
      details: { profileId: params.id },
    })

    return NextResponse.json(followUp)
  } catch (error) {
    console.error('Error adding follow-up:', error)
    return NextResponse.json({ error: 'Failed to add follow-up' }, { status: 500 })
  }
}
