'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import Notification from './Notification'

interface RejectionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (rejectedBy: string, reason: string) => void
}

export default function RejectionModal({ isOpen, onClose, onConfirm }: RejectionModalProps) {
  const { t } = useTranslation()
  const [rejectedBy, setRejectedBy] = useState('BOY_SIDE')
  const [reason, setReason] = useState('')
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reason.trim()) {
      setNotification({ message: 'Please provide a rejection reason', type: 'error' })
      return
    }
    onConfirm(rejectedBy, reason)
    setReason('')
    setRejectedBy('BOY_SIDE')
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
      <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-modal-in">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="text-5xl flex-shrink-0 text-red-500">
              ⚠️
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reject Profile</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Who Rejected?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rejectedBy"
                        value="BOY_SIDE"
                        checked={rejectedBy === 'BOY_SIDE'}
                        onChange={(e) => setRejectedBy(e.target.value)}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <span className="text-gray-700">{t('rejectionSide.boySide')}</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rejectedBy"
                        value="GIRL_SIDE"
                        checked={rejectedBy === 'GIRL_SIDE'}
                        onChange={(e) => setRejectedBy(e.target.value)}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <span className="text-gray-700">{t('rejectionSide.girlSide')}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rejection Reason *
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter the reason for rejection..."
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-red-600 rounded-lg text-white font-medium transition-all hover:bg-red-700 hover:shadow-lg"
                  >
                    Confirm Rejection
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
