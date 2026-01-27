
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

let accessToken = localStorage.getItem('access_token')
let refreshToken = localStorage.getItem('refresh_token')

export const setTokens = (access, refresh) => {
  accessToken = access
  refreshToken = refresh
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)
}

export const clearTokens = () => {
  accessToken = null
  refreshToken = null
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error('Invalid credentials')
  }

  const data = await response.json()
  setTokens(data.access, data.refresh)
  return data
}

export const logout = () => {
  clearTokens()
  window.location.href = '/login'
}

export const refreshAccessToken = async () => {
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  })

  if (!response.ok) {
    clearTokens()
    throw new Error('Session expired. Please login again.')
  }

  const data = await response.json()
  accessToken = data.access
  localStorage.setItem('access_token', data.access)
  return data.access
}

const request = async (path, options = {}, retry = true) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (response.status === 401 && retry && refreshToken) {
    try {
      await refreshAccessToken()
      return request(path, options, false)
    } catch (error) {
      clearTokens()
      console.error('Token refresh failed:', error)
      throw new Error('Session expired. Please login again.')
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    const message = errorBody?.message || 'Failed to load data from the server.'
    throw new Error(message)
  }

  return response.json()
}

export const isAuthenticated = () => !!accessToken


// ============ Activities (with mock data fallback) =============

export const fetchActivities = async (type = null) => {
  const params = type ? `?activity_type=${type}` : ''
  const response = await request(`/activities/${params}`)
  return response
}

export const fetchProjects = async () => {
  return await fetchActivities('Project')
}

export const fetchPublications = async () => {
  return await fetchActivities('Publication')
}

export const fetchActivityDetail = async (id) => {
  return await request(`/activities/${id}/`)
}

export const createActivity = async (payload) => {
  return await request('/activities/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

// ========== SDG Goals (with mock data fallback) ==========

export const fetchSDGs = async () => {
  const response = await request('/sdg/')
  const results = response?.results || response
  return results
}

export const fetchSDGActivities = async (sdgNumber) => {
  const response = await request(`/sdg/${sdgNumber}/activities/`)
  return response
}


// use this to display SDG summary data on dashboard and SDG detail pages
export const fetchSDGSummary = async (sdgNumber) => {
  const response = await request(`/sdg/${sdgNumber}/summary/`)
  console.log('SDG Summary Response:', response)
  return response
}
` `
export const fetchDashboardSummary = async () => {
  const response = await request('/reports/summary/')
  return response
}

// ========== Dashboard Stats ==========

export const fetchDashboardStats = async () => {
  const response = await request('/reports/summary/')
  return response.totals
}

// ========== Recent Data ==========

export const fetchRecentProjects = async (limit = 5) => {
  const response = await request(`/activities/?activity_type=Project&ordering=-date_created&limit=${limit}`)
  const results = response?.results || response
  return results.slice(0, limit)
}

// ========== Benchmark ==========

export const fetchBenchmarkData = async () => {
  const response = await request('/benchmark/')
  return response
}

// ========== Mock Data Fallbacks ==========


export const fetchMetadata = async () => {
  return await request('/metadata')
}

export const fetchReportSummary = async () => {
  return await request('/reports/summary')
}

export const fetchSdgDetail = async (sdgId) => {
  return await request(`/reports/sdg/${sdgId}`)
}

export const fetchRecordDetail = async (recordId) => {
  return await request(`/records/${recordId}`)
}

export const createRecord = async (payload) => {
  return await request('/records', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const createResearcher = async (payload) => {
  return await request('/metadata/researchers', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

// ========== AI Classification ==========

export const classifyActivity = async (title, description, activity_type) => {
  // First create the activity which triggers AI classification
  const response = await request('/activities/', {
    method: 'POST',
    body: JSON.stringify({
      title,
      description,
      activity_type,
    }),
  })
  return response
}

export const submitActivityWithClassification = async (payload) => {
  try {
    return await request('/activities/', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.warn('Activity submission failed:', error.message)
    throw error
  }
}
