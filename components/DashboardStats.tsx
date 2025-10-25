'use client'

import { useTranslation } from '@/hooks/useTranslation'

interface DashboardStatsProps {
  totalProfiles: number
  newProfiles: number
  pendingProfiles: number
  acceptedProfiles: number
  rejectedProfiles: number
}

export default function DashboardStats({
  totalProfiles,
  newProfiles,
  pendingProfiles,
  acceptedProfiles,
  rejectedProfiles,
}: DashboardStatsProps) {
  const { t } = useTranslation()

  const stats = [
    {
      title: t('dashboard.totalProfiles'),
      value: totalProfiles,
      gradient: 'from-blue-500 to-blue-600',
      icon: '📊',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('dashboard.newProfiles'),
      value: newProfiles,
      gradient: 'from-emerald-500 to-emerald-600',
      icon: '✨',
      bgColor: 'bg-emerald-50',
    },
    {
      title: t('dashboard.pendingProfiles'),
      value: pendingProfiles,
      gradient: 'from-amber-500 to-amber-600',
      icon: '⏳',
      bgColor: 'bg-amber-50',
    },
    {
      title: t('dashboard.acceptedProfiles'),
      value: acceptedProfiles,
      gradient: 'from-purple-500 to-purple-600',
      icon: '✅',
      bgColor: 'bg-purple-50',
    },
    {
      title: t('dashboard.rejectedProfiles'),
      value: rejectedProfiles,
      gradient: 'from-rose-500 to-rose-600',
      icon: '❌',
      bgColor: 'bg-rose-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-medium mb-2">{stat.title}</p>
              <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-xl ml-3`}>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
