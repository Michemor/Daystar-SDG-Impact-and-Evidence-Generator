import { useState, useEffect } from 'react'
import { fetchRecentProjects } from '../services/apiClient'

const statusColors = {
  Active: 'bg-green-500',
  Planned: 'bg-blue-500',
  Completed: 'bg-purple-600',
}

export default function RecentProjectsTable() {
  const [recentProjects, setRecentProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRecentProjects = async () => {
      try {
        const data = await fetchRecentProjects(5)
        setRecentProjects(data)
      } catch (error) {
        console.error('Error loading recent projects:', error)
      } finally {
        setLoading(false)
      }
    }
    loadRecentProjects()
  }, [])

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading recent projects...</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Project</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">SDGs</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Impact</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentProjects.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.project || row.title}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
                      statusColors[row.status] || 'bg-gray-500'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(row.sdgs || []).map((sdg) => (
                      <span
                        key={sdg}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800"
                      >
                        {sdg}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.department}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-500">{row.impact}%</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        style={{ width: `${row.impact}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
