'use client'

import { useTranslation } from '@/hooks/useTranslation'

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

interface EditHistoryProps {
  history: EditHistoryEntry[]
}

export default function EditHistory({ history }: EditHistoryProps) {
  const { t } = useTranslation()

  const formatFieldName = (field: string) => {
    return field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        📝 Edit History ({history.length})
      </h3>
      
      {history.length === 0 ? (
        <p className="text-gray-500 italic">No edits yet</p>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <div key={entry.id} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">
                    {formatFieldName(entry.field)}
                  </p>
                  <p className="text-sm text-gray-500">
                    by {entry.editor.name}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(entry.createdAt).toLocaleString()}
                </span>
              </div>
              
              <div className="mt-2 space-y-1 text-sm">
                {entry.oldValue && (
                  <div className="flex items-start">
                    <span className="text-red-600 mr-2">-</span>
                    <span className="text-gray-600 line-through">{entry.oldValue}</span>
                  </div>
                )}
                {entry.newValue && (
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">+</span>
                    <span className="text-gray-900">{entry.newValue}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
