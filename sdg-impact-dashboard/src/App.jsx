// Defines the main application component for the SDG Impact Dashboard
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import ImpactMap from "./pages/ImpactMap"
import { Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import ReportsPage from './pages/ReportsPage'
import AddEntryPage from './pages/AddEntryPage'

function App() {
 return (
   <Routes>
     <Route path="/" element={<Dashboard />} >
     <Route index element={<MainContent />} />
     <Route path="projects" element={<Projects />} />
     <Route path="impact-map" element={<ImpactMap />} />
      </Route>
   </Routes>
 )
	return (
		<BrowserRouter>
			<div className="app-shell">
				<header className="top-bar">
					<div>
						<strong>Daystar Research Intelligence Hub</strong>
					</div>
					<nav>
						<NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
							Reports
						</NavLink>
						<NavLink to="/add-entry" className={({ isActive }) => (isActive ? 'active' : '')}>
							Add Project / Publication
						</NavLink>
					</nav>
				</header>
				<main className="main-content">
					<div className="content-container">
						<Routes>
							<Route path="/" element={<ReportsPage />} />
							<Route path="/reports" element={<ReportsPage />} />
							<Route path="/add-entry" element={<AddEntryPage />} />
						</Routes>
					</div>
				</main>
			</div>
		</BrowserRouter>
	)
}

export default App
