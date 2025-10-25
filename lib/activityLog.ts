import { prisma } from './prisma'

export interface LogActivityParams {
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'STATUS_CHANGE'
  entityType: 'PROFILE' | 'USER' | 'COMMENT' | 'FOLLOWUP'
  entityId: string
  userId: string
  details?: any
  ipAddress?: string
  userAgent?: string
}

export async function logActivity(params: LogActivityParams) {
  try {
    await prisma.activityLog.create({
      data: {
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        userId: params.userId,
        details: params.details ? JSON.stringify(params.details) : null,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
      },
    })
  } catch (error) {
    console.error('Error logging activity:', error)
  }
}

export async function getActivityLogs(options?: {
  limit?: number
  userId?: string
  entityType?: string
  action?: string
}) {
  return await prisma.activityLog.findMany({
    take: options?.limit || 100,
    where: {
      ...(options?.userId && { userId: options.userId }),
      ...(options?.entityType && { entityType: options.entityType }),
      ...(options?.action && { action: options.action }),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
