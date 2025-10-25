import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    const updateData: any = {
      status: data.status,
    }

    if (data.rejectedBy) {
      updateData.rejectedBy = data.rejectedBy
      updateData.rejectionReason = data.rejectionReason || null
    } else {
      updateData.rejectedBy = null
      updateData.rejectionReason = null
    }

    const profile = await prisma.profile.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error updating profile status:', error)
    return NextResponse.json({ error: 'Failed to update profile status' }, { status: 500 })
  }
}
