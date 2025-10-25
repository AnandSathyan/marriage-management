'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'
import Notification from './Notification'
import Modal from './Modal'
import RejectionModal from './RejectionModal'
import CommentSection from './CommentSection'
import FollowUpSection from './FollowUpSection'
import EditHistory from './EditHistory'

interface Comment {
  id: string
  content: string
  createdAt: Date
}

interface FollowUp {
  id: string
  content: string
  scheduledDate: Date | null
  createdAt: Date
}

interface EditHistoryEntry {
  id: string
  field: string
  oldValue: string | null
  newValue: string | null
  createdAt: Date
  editor: {
    name: string
    email: string
  }
}

interface Profile {
  id: string
  name: string
  fathersName?: string | null
  nakshathram?: string | null
  age: number
  education: string
  occupation: string
  location: string
  contact?: string
  bio?: string
  photos: string[]
  status: string
  statusReason?: string
  rejectedBy?: string
  rejectionReason?: string
  createdAt: Date
  user: {
    name: string
  }
  comments: Comment[]
  followUps: FollowUp[]
  editHistory: EditHistoryEntry[]
}

interface ProfileDetailsProps {
  profile: Profile
  userId: string
}

export default function ProfileDetails({ profile, userId }: ProfileDetailsProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const updateProfileStatus = async (newStatus: string, rejectedBy?: string, rejectionReason?: string) => {
    setUpdatingStatus(true)
    try {
      const response = await fetch(`/api/profiles/${profile.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, rejectedBy, rejectionReason }),
      })
      
      if (response.ok) {
        setNotification({ message: 'Status updated successfully!', type: 'success' })
        router.refresh()
      } else {
        setNotification({ message: 'Failed to update status', type: 'error' })
      }
    } catch (error) {
      console.error('Error:', error)
      setNotification({ message: 'An error occurred', type: 'error' })
    } finally {
      setUpdatingStatus(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'ACCEPTED':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/profiles/${profile.id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setNotification({ message: 'Profile deleted successfully!', type: 'success' })
        setTimeout(() => {
          router.push('/profiles')
          router.refresh()
        }, 1000)
      } else {
        setNotification({ message: 'Failed to delete profile', type: 'error' })
      }
    } catch (error) {
      console.error('Error:', error)
      setNotification({ message: 'An error occurred', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async () => {
    if (!pendingStatus) return
    await updateProfileStatus(pendingStatus)
    setShowStatusModal(false)
    setPendingStatus(null)
  }

  const handleRejection = async (rejectedBy: string, reason: string) => {
    await updateProfileStatus('REJECTED', rejectedBy, reason)
    setShowRejectionModal(false)
  }

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Profile"
        message="Are you sure you want to delete this profile? This action cannot be undone."
        type="error"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
      />

      <Modal
        isOpen={showStatusModal}
        onClose={() => {
          setShowStatusModal(false)
          setPendingStatus(null)
        }}
        title="Change Status"
        message={`Are you sure you want to change the status to "${t(`profiles.status.${pendingStatus?.toLowerCase()}`)}"?`}
        type="warning"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={handleStatusUpdate}
      />

      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onConfirm={handleRejection}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
        <Link
          href="/profiles"
          className="text-pink-600 hover:text-pink-700 flex items-center"
        >
          ← Back to Profiles
        </Link>
        <div className="flex gap-2">
          <Link
            href={`/profiles/${profile.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('common.edit')}
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {t('common.delete')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Photos Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          {profile.photos.length > 0 ? (
            profile.photos.map((photo, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={`${profile.name} - Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-9xl">
              👤
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="p-6 border-t">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-600 mt-1">{profile.age} years old</p>
            </div>
            <span className={`px-4 py-2 rounded-lg font-semibold border-2 ${getStatusColor(profile.status)}`}>
              {t(`profiles.status.${profile.status.toLowerCase()}`)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {profile.fathersName && (
              <div>
                <label className="text-sm font-semibold text-gray-700">{t('profiles.fathersName')}</label>
                <p className="mt-1 text-gray-900">{profile.fathersName}</p>
              </div>
            )}
            {profile.nakshathram && (
              <div>
                <label className="text-sm font-semibold text-gray-700">{t('profiles.nakshathram')}</label>
                <p className="mt-1 text-gray-900">{profile.nakshathram}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-semibold text-gray-700">{t('profiles.education')}</label>
              <p className="mt-1 text-gray-900">{profile.education}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">{t('profiles.occupation')}</label>
              <p className="mt-1 text-gray-900">{profile.occupation}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">{t('profiles.location')}</label>
              <p className="mt-1 text-gray-900">{profile.location}</p>
            </div>
            {profile.contact && (
              <div>
                <label className="text-sm font-semibold text-gray-700">{t('profiles.contact')}</label>
                <p className="mt-1 text-gray-900">{profile.contact}</p>
              </div>
            )}
          </div>

          {profile.bio && (
            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-700">{t('profiles.bio')}</label>
              <p className="mt-1 text-gray-900">{profile.bio}</p>
            </div>
          )}

          {profile.statusReason && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <label className="text-sm font-semibold text-gray-700">{t('profiles.statusReason')}</label>
              <p className="mt-1 text-gray-900">{profile.statusReason}</p>
            </div>
          )}

          {profile.status === 'REJECTED' && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-semibold text-red-800">
                {t('profiles.rejectedBy')}: {profile.rejectedBy === 'BOY_SIDE' ? t('rejectionSide.boySide') : t('rejectionSide.girlSide')}
              </p>
              {profile.rejectionReason && (
                <p className="mt-2 text-red-900">{profile.rejectionReason}</p>
              )}
            </div>
          )}
        </div>

        {/* Status Change Section */}
        <div className="p-6 border-t bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">{t('profiles.changeStatus')}</h3>
          <div className="flex flex-wrap gap-2">
            {['NEW', 'PENDING', 'ACCEPTED', 'REJECTED'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  if (status === 'REJECTED') {
                    setShowRejectionModal(true)
                  } else {
                    setPendingStatus(status)
                    setShowStatusModal(true)
                  }
                }}
                disabled={updatingStatus || profile.status === status}
                className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  profile.status === status
                    ? 'bg-pink-600 text-white cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-pink-500'
                }`}
              >
                {t(`profiles.status.${status.toLowerCase()}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-6 border-t">
          <CommentSection
            profileId={profile.id}
            comments={profile.comments}
            onCommentAdded={() => setRefreshKey(prev => prev + 1)}
          />
        </div>

        {/* Follow-ups Section */}
        <div className="p-6 border-t bg-gray-50">
          <FollowUpSection
            profileId={profile.id}
            followUps={profile.followUps}
            onFollowUpAdded={() => setRefreshKey(prev => prev + 1)}
          />
        </div>

        {/* Edit History Section */}
        <div className="p-6 border-t">
          <EditHistory history={profile.editHistory} />
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 text-sm text-gray-600">
          <p>Added by {profile.user.name} on {new Date(profile.createdAt).toLocaleString()}</p>
        </div>
      </div>
      </div>
    </>
  )
}
