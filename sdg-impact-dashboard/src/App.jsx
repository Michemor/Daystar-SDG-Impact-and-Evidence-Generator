import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import MainContent from "./components/MainContent"
import { Route, Routes } from 'react-router-dom'
import ReportsPage from './pages/ReportsPage'
import AddEntryPage from './pages/AddEntryPage'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Benchmark from "./pages/BenchMark"
import SDGAnalysis from "./pages/SDGAnalysis"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<MainContent />} />
        <Route path="projects" element={<Projects />} />
        <Route path="benchmark" element={<Benchmark />} />
        <Route path="sdg-analysis" element={<SDGAnalysis />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="add-entry" element={<AddEntryPage />} />
      </Route>
    </Routes>
  )
}

export default App