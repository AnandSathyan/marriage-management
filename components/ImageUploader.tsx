'use client'

import { useState } from 'react'
import Notification from './Notification'

interface ImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      // For demo purposes, we'll convert to base64
      // In production, you'd upload to a service like Cloudinary, AWS S3, etc.
      const newUrls: string[] = [...value]

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.size > 5 * 1024 * 1024) {
          setNotification({ message: `${file.name} is too large. Max size is 5MB.`, type: 'error' })
          continue
        }

        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result as string
          if (!newUrls.includes(base64String)) {
            newUrls.push(base64String)
            onChange([...newUrls])
          }
        }
        reader.readAsDataURL(file)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      setNotification({ message: 'Failed to upload image', type: 'error' })
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index)
    onChange(newUrls)
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
      <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium inline-block">
          {uploading ? '📤 Uploading...' : '📷 Upload Photos'}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
        </label>
        <span className="text-sm text-gray-500">Or paste image URL below</span>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  )
}
