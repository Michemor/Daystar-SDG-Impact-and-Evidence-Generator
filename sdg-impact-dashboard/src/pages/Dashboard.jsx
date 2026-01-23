import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopNavigation from '../components/TopNavigation'
import SideMenu from '../components/SideMenu'
import FloatingActionButton from '../components/FloatingActionButton'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <TopNavigation onToggleSidebar={toggleSidebar} />
      <SideMenu open={sidebarOpen} />
      <main 
        className={`transition-all duration-300 pt-4 ${
          sidebarOpen ? 'ml-60' : 'ml-[72px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <Outlet />
        </div>
      </main>
      
      {/* Floating Action Button for adding new entries */}
      <FloatingActionButton 
        navigateTo="/add-entry"
        label="Add New Entry"
      />
    </div>
  )
}
