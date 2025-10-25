import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { logActivity } from '@/lib/activityLog'

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
    
    // Get the existing profile to compare changes
    const existingProfile = await prisma.profile.findUnique({
      where: { id: params.id },
    })

    if (!existingProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Update the profile
    const profile = await prisma.profile.update({
      where: { id: params.id },
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
      },
    })

    // Track changes in edit history
    const fields = ['name', 'fathersName', 'nakshathram', 'age', 'education', 'occupation', 'location', 'contact', 'bio', 'photos']
    const changes = []

    for (const field of fields) {
      const oldValue = String(existingProfile[field as keyof typeof existingProfile] ?? '')
      const newValue = String(data[field] ?? '')
      
      if (oldValue !== newValue) {
        changes.push({
          profileId: params.id,
          editedBy: session.user!.id!,
          field,
          oldValue: oldValue.length > 200 ? oldValue.substring(0, 200) + '...' : oldValue,
          newValue: newValue.length > 200 ? newValue.substring(0, 200) + '...' : newValue,
        })
      }
    }

    // Create edit history records
    if (changes.length > 0) {
      await prisma.profileEditHistory.createMany({
        data: changes,
      })
    }

    // Log activity
    await logActivity({
      action: 'UPDATE',
      entityType: 'PROFILE',
      entityId: profile.id,
      userId: session.user!.id!,
      details: { profileName: profile.name, fieldsChanged: changes.length },
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get profile before deleting for logging
    const profile = await prisma.profile.findUnique({
      where: { id: params.id },
      select: { name: true },
    })

    await prisma.profile.delete({
      where: { id: params.id },
    })

    // Log activity
    if (profile) {
      await logActivity({
        action: 'DELETE',
        entityType: 'PROFILE',
        entityId: params.id,
        userId: session.user!.id!,
        details: { profileName: profile.name },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting profile:', error)
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 })
  }
}
