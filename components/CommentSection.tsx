'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import Notification from './Notification'

interface Comment {
  id: string
  content: string
  createdAt: Date
}

interface CommentSectionProps {
  profileId: string
  comments: Comment[]
  onCommentAdded: () => void
}

export default function CommentSection({ profileId, comments, onCommentAdded }: CommentSectionProps) {
  const { t } = useTranslation()
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/profiles/${profileId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      })

      if (response.ok) {
        setNewComment('')
        setNotification({ message: 'Comment added successfully!', type: 'success' })
        onCommentAdded()
      } else {
        setNotification({ message: 'Failed to add comment', type: 'error' })
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
          💬 {t('profiles.comments')} ({comments.length})
        </h3>

        {/* Add Comment Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-2"
          />
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
          >
            {loading ? 'Adding...' : t('profiles.addComment')}
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-900 whitespace-pre-wrap">{comment.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </>
  )
}
