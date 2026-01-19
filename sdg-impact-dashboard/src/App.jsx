import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import MainContent from './components/MainContent'
import ReportsPage from './pages/ReportsPage'
import AddEntryPage from './pages/AddEntryPage'
import Benchmark from './pages/BenchMark'

// Defines the main application component for the SDG Impact Dashboard

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />}>
					<Route index element={<MainContent />} />
					<Route path="projects" element={<Projects />} />
					<Route path="benchmark" element={<Benchmark />} />
					<Route path="reports" element={<ReportsPage />} />
					<Route path="add-entry" element={<AddEntryPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
