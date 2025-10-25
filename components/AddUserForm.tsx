'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'

interface AddUserFormProps {
  existingUser?: any
}

export default function AddUserForm({ existingUser }: AddUserFormProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: existingUser?.name || '',
    email: existingUser?.email || '',
    password: '',
    role: existingUser?.role || 'MEMBER',
    language: existingUser?.language || 'ENGLISH',
    privileges: existingUser?.privileges || [],
  })

  const privileges = [
    'all',
    'view_profiles',
    'add_profiles',
    'edit_profiles',
    'delete_profiles',
    'manage_users',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = existingUser ? `/api/users/${existingUser.id}` : '/api/users'
      const method = existingUser ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/users')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save user')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const togglePrivilege = (privilege: string) => {
    if (privilege === 'all') {
      if (formData.privileges.includes('all')) {
        setFormData({ ...formData, privileges: [] })
      } else {
        setFormData({ ...formData, privileges: ['all'] })
      }
    } else {
      const newPrivileges = formData.privileges.includes(privilege)
        ? formData.privileges.filter((p) => p !== privilege)
        : [...formData.privileges.filter((p) => p !== 'all'), privilege]
      setFormData({ ...formData, privileges: newPrivileges })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {existingUser ? 'New Password (leave blank to keep current)' : 'Password *'}
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required={!existingUser}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role *
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="MEMBER">Member</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language *
          </label>
          <select
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="ENGLISH">English</option>
            <option value="MALAYALAM">മലയാളം (Malayalam)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Privileges
        </label>
        <div className="grid grid-cols-2 gap-2">
          {privileges.map((privilege) => (
            <label
              key={privilege}
              className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-purple-50"
            >
              <input
                type="checkbox"
                checked={formData.privileges.includes(privilege)}
                onChange={() => togglePrivilege(privilege)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700 capitalize">
                {privilege.replace(/_/g, ' ')}
              </span>
            </label>
          ))}
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
          onClick={() => router.push('/users')}
          className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium"
        >
          {t('common.cancel')}
        </button>
      </div>
    </form>
  )
}
