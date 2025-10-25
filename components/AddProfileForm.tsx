'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import ImageUploader from './ImageUploader'
import Notification from './Notification'

interface AddProfileFormProps {
  userId: string
  existingProfile?: any
}

export default function AddProfileForm({ userId, existingProfile }: AddProfileFormProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [formData, setFormData] = useState({
    name: existingProfile?.name || '',
    fathersName: existingProfile?.fathersName || '',
    nakshathram: existingProfile?.nakshathram || '',
    age: existingProfile?.age || '',
    education: existingProfile?.education || '',
    occupation: existingProfile?.occupation || '',
    location: existingProfile?.location || '',
    contact: existingProfile?.contact || '',
    bio: existingProfile?.bio || '',
    photos: existingProfile?.photos || [''],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = existingProfile 
        ? `/api/profiles/${existingProfile.id}`
        : '/api/profiles'
      
      const method = existingProfile ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
        }),
      })

      if (response.ok) {
        setNotification({ message: existingProfile ? 'Profile updated successfully!' : 'Profile created successfully!', type: 'success' })
        setTimeout(() => {
          router.push('/profiles')
          router.refresh()
        }, 1000)
      } else {
        setNotification({ message: 'Failed to save profile', type: 'error' })
      }
    } catch (error) {
      console.error('Error:', error)
      setNotification({ message: 'An error occurred', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const addPhotoField = () => {
    setFormData({
      ...formData,
      photos: [...formData.photos, ''],
    })
  }

  const updatePhoto = (index: number, value: string) => {
    const newPhotos = [...formData.photos]
    newPhotos[index] = value
    setFormData({ ...formData, photos: newPhotos })
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
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('profiles.name')} *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('profiles.fathersName')}
          </label>
          <input
            type="text"
            value={formData.fathersName}
            onChange={(e) => setFormData({ ...formData, fathersName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('profiles.nakshathram')}
          </label>
          <input
            type="text"
            value={formData.nakshathram}
            onChange={(e) => setFormData({ ...formData, nakshathram: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('profiles.age')} *
          </label>
          <input
            type="number"
            required
            min="18"
            max="100"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('profiles.education')} *
          </label>
          <input
            type="text"
            required
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('profiles.occupation')} *
          </label>
          <input
            type="text"
            required
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('profiles.location')} *
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('profiles.contact')}
          </label>
          <input
            type="text"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('profiles.bio')}
        </label>
        <textarea
          rows={4}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('profiles.photos')}
        </label>
        
        <ImageUploader
          value={formData.photos.filter(p => p.trim() !== '')}
          onChange={(urls) => setFormData({ ...formData, photos: urls.length > 0 ? urls : [''] })}
        />

        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Or add image URLs:</p>
          {formData.photos.map((photo, index) => (
            <input
              key={index}
              type="url"
              value={photo}
              onChange={(e) => updatePhoto(index, e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          ))}
          <button
            type="button"
            onClick={addPhotoField}
            className="text-pink-600 hover:text-pink-700 text-sm"
          >
            + Add URL
          </button>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
        >
          {loading ? 'Saving...' : t('common.save')}
        </button>
        <button
          type="button"
          onClick={() => router.push('/profiles')}
          className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium"
        >
          {t('common.cancel')}
        </button>
      </div>
    </form>
    </>
  )
}
