import {
  projectsData,
  publicationsData,
  sdgsData,
  getDashboardStats,
  getMockMetadata,
  getMockSummary,
  getMockSdgDetail,
  getMockRecordDetail,
  addMockRecord,
  getRecentProjects,
} from '../data/mockData'

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
  try {
    const params = type ? `?activity_type=${type}` : ''
    const response = await request(`/activities/${params}`)
    // Check if response has data
    const results = response?.results || response
    if (results && results.length > 0) {
      return response
    }
    throw new Error('No data returned')
  } catch (error) {
    console.warn('Falling back to mock activities:', error.message)
    const allActivities = [...projectsData, ...publicationsData]
    if (type) {
      return allActivities.filter(a => a.activity_type === type)
    }
    return allActivities
  }
}

export const fetchProjects = async () => {
  try {
    const response = await request('/activities/?activity_type=project')
    const results = response?.results || response
    if (results && results.length > 0) {
      return results
    }
    throw new Error('No data returned')
  } catch (error) {
    console.warn('Falling back to mock projects:', error.message)
    return projectsData
  }
}

export const fetchPublications = async () => {
  try {
    const response = await request('/activities/?activity_type=publication')
    const results = response?.results || response
    if (results && results.length > 0) {
      return results
    }
    throw new Error('No data returned')
  } catch (error) {
    console.warn('Falling back to mock publications:', error.message)
    return publicationsData
  }
}

export const fetchActivityDetail = async (id) => {
  try {
    return await request(`/activities/${id}/`)
  } catch (error) {
    console.warn('Falling back to mock activity detail:', error.message)
    return getMockRecordDetail(id)
  }
}

export const createActivity = async (payload) => {
  try {
    return await request('/activities/', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.warn('Storing activity using mock store:', error.message)
    return addMockRecord(payload)
  }
}

// ========== SDG Goals (with mock data fallback) ==========

export const fetchSDGs = async () => {
  try {
    const response = await request('/sdg/')
    const results = response?.results || response
    if (results && results.length > 0) {
      return results
    }
    throw new Error('No data returned')
  } catch (error) {
    console.warn('Falling back to mock SDGs:', error.message)
    return sdgsData
  }
}

export const fetchSDGActivities = async (sdgNumber) => {
  try {
    const response = await request(`/sdg/${sdgNumber}/activities/`)
    if (response && response.length > 0) {
      return response
    }
    throw new Error('No data returned')
  } catch (error) {
    console.warn('Falling back to mock SDG activities:', error.message)
    const detail = getMockSdgDetail(sdgNumber)
    return [...(detail?.projects || []), ...(detail?.publications || [])]
  }
}

export const fetchSDGSummary = async (sdgNumber) => {
  try {
    return await request(`/sdg/${sdgNumber}/summary/`)
  } catch (error) {
    console.warn('Falling back to mock SDG summary:', error.message)
    return getMockSdgDetail(sdgNumber)
  }
}

// ========== Reports (with mock data fallback) ==========

export const fetchDashboardSummary = async () => {
  try {
    const response = await request('/reports/summary/')
    if (response) {
      return response
    }
    throw new Error('No data returned')
  } catch (error) {
    console.warn('Falling back to mock dashboard summary:', error.message)
    return getMockSummary()
  }
}

// ========== Dashboard Stats ==========

export const fetchDashboardStats = async () => {
  try {
    const response = await request('/reports/summary/')
    if (response?.totals) {
      return response.totals
    }
    throw new Error('No data returned')
  } catch (error) {
    console.warn('Falling back to mock dashboard stats:', error.message)
    return getDashboardStats()
  }
}

// ========== Recent Data ==========

export const fetchRecentProjects = async (limit = 5) => {
  try {
    const response = await request(`/activities/?activity_type=project&ordering=-date_created&limit=${limit}`)
    const results = response?.results || response
    if (results && results.length > 0) {
      return results.slice(0, limit)
    }
    throw new Error('No data returned')
  } catch (error) {
    console.warn('Falling back to mock recent projects:', error.message)
    return getRecentProjects(limit)
  }
}

// ========== Mock Data Fallbacks ==========


export const fetchMetadata = async () => {
  try {
    return await request('/metadata')
  } catch (error) {
    console.warn('Falling back to mock metadata:', error.message)
    return getMockMetadata()
  }
}

export const fetchReportSummary = async () => {
  try {
    return await request('/reports/summary')
  } catch (error) {
    console.warn('Falling back to mock reports summary:', error.message)
    return getMockSummary()
  }
}

export const fetchSdgDetail = async (sdgId) => {
  try {
    return await request(`/reports/sdg/${sdgId}`)
  } catch (error) {
    console.warn(`Falling back to mock SDG detail for ${sdgId}:`, error.message)
    const detail = getMockSdgDetail(sdgId)
    if (!detail) {
      throw error
    }
    return detail
  }
}

export const fetchRecordDetail = async (recordId) => {
  try {
    return await request(`/records/${recordId}`)
  } catch (error) {
    console.warn(`Falling back to mock record detail for ${recordId}:`, error.message)
    const detail = getMockRecordDetail(recordId)
    if (!detail) {
      throw error
    }
    return detail
  }
}

export const createRecord = async (payload) => {
  try {
    return await request('/records', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.warn('Storing record using mock store:', error.message)
    const record = addMockRecord(payload)
    return { record }
  }
}

export const createResearcher = async (payload) => {
  try {
    return await request('/metadata/researchers', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.warn('Creating researcher using mock store:', error.message)
    const id = `res-${Date.now()}`
    const researcher = { id, name: payload.name, departmentId: payload.departmentId }
    return { researcher }
  }
}