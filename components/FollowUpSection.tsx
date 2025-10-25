'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import Notification from './Notification'

interface FollowUp {
  id: string
  content: string
  scheduledDate: Date | null
  createdAt: Date
}

interface FollowUpSectionProps {
  profileId: string
  followUps: FollowUp[]
  onFollowUpAdded: () => void
}

export default function FollowUpSection({ profileId, followUps, onFollowUpAdded }: FollowUpSectionProps) {
  const { t } = useTranslation()
  const [newFollowUp, setNewFollowUp] = useState('')
  const [scheduledDate, setScheduledDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFollowUp.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/profiles/${profileId}/followups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newFollowUp,
          scheduledDate: scheduledDate || null,
        }),
      })

      if (response.ok) {
        setNewFollowUp('')
        setScheduledDate('')
        setNotification({ message: 'Follow-up added successfully!', type: 'success' })
        onFollowUpAdded()
      } else {
        setNotification({ message: 'Failed to add follow-up', type: 'error' })
      }
    } catch (error) {
      console.error('Error:', error)
      setNotification({ message: 'An error occurred', type: 'error' })
    } finally {
      setLoading(false)
    }
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
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          📅 {t('profiles.followUps')} ({followUps.length})
        </h3>

        {/* Add Follow-up Form */}
        <form onSubmit={handleSubmit} className="mb-6 space-y-3">
          <textarea
            value={newFollowUp}
            onChange={(e) => setNewFollowUp(e.target.value)}
            placeholder="Add a follow-up note..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Schedule Date (optional):</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !newFollowUp.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
          >
            {loading ? 'Adding...' : t('profiles.addFollowUp')}
          </button>
        </form>

        {/* Follow-ups List */}
        <div className="space-y-4">
          {followUps.map((followUp) => (
            <div key={followUp.id} className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-gray-900 whitespace-pre-wrap">{followUp.content}</p>
              <div className="mt-2 space-y-1">
                {followUp.scheduledDate && (
                  <p className="text-sm text-purple-600">
                    📅 Scheduled: {new Date(followUp.scheduledDate).toLocaleDateString()}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Added: {new Date(followUp.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          {followUps.length === 0 && (
            <p className="text-gray-500 italic">No follow-ups yet. Schedule your first follow-up!</p>
          )}
        </div>
      </div>
    </>
  )
}
