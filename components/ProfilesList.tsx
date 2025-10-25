'use client'

import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'

interface Profile {
  id: string
  name: string
  age: number
  education: string
  occupation: string
  location: string
  photos: string[]
  status: string
  createdAt: Date
  user: {
    name: string
  }
  _count: {
    comments: number
    followUps: number
  }
}

interface ProfilesListProps {
  profiles: Profile[]
}

export default function ProfilesList({ profiles }: ProfilesListProps) {
  const { t } = useTranslation()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'ACCEPTED':
        return 'bg-purple-100 text-purple-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <Link
          key={profile.id}
          href={`/profiles/${profile.id}`}
          className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
        >
          <div className="h-72 bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
            {profile.photos.length > 0 ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={profile.photos[0]}
                alt={profile.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl bg-gradient-to-br from-purple-200 to-pink-200">
                👤
              </div>
            )}
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${getStatusColor(profile.status)}`}>
                {t(`profiles.status.${profile.status.toLowerCase()}`)}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{profile.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{profile.age} years old</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📚</span>
                <span className="truncate">{profile.education}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">💼</span>
                <span className="truncate">{profile.occupation}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📍</span>
                <span className="truncate">{profile.location}</span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
              <span className="truncate">By {profile.user.name}</span>
              <span className="flex items-center">
                💬 {profile._count.comments}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
