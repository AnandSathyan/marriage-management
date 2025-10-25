'use client'

import { useTranslation } from '@/hooks/useTranslation'

interface ActivityLog {
  id: string
  action: string
  entityType: string
  entityId: string
  details: string | null
  createdAt: Date
  user: {
    id: string
    name: string
    email: string
  }
}

interface ActivityLogsListProps {
  logs: ActivityLog[]
}

export default function ActivityLogsList({ logs }: ActivityLogsListProps) {
  const { t } = useTranslation()

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE':
        return '➕'
      case 'UPDATE':
        return '✏️'
      case 'DELETE':
        return '🗑️'
      case 'STATUS_CHANGE':
        return '🔄'
      default:
        return '📝'
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-green-100 text-green-800'
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800'
      case 'DELETE':
        return 'bg-red-100 text-red-800'
      case 'STATUS_CHANGE':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDetails = (details: string | null) => {
    if (!details) return null
    try {
      const parsed = JSON.parse(details)
      return parsed
    } catch {
      return details
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Entity Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => {
              const details = formatDetails(log.details)
              return (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{log.user.name}</div>
                      <div className="text-xs text-gray-500">{log.user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                      {getActionIcon(log.action)} {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.entityType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {details ? (
                      <div className="max-w-xs truncate" title={JSON.stringify(details, null, 2)}>
                        {details.profileName && `Profile: ${details.profileName}`}
                        {details.fieldsChanged !== undefined && ` (${details.fieldsChanged} fields changed)`}
                        {details.profileId && ` Profile ID: ${details.profileId}`}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">No details</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {logs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Activity Logs</h3>
          <p className="text-gray-500">Activity logs will appear here as users interact with the system</p>
        </div>
      )}
    </div>
  )
}
