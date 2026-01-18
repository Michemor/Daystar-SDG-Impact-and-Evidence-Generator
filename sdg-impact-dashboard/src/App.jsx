// Defines the main application component for the SDG Impact Dashboard
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import ImpactMap from "./pages/ImpactMap"
import { Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";

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
}

export default App
