import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import BazarPage from './pages/BazarPage'
import TutorVirtualPage from './pages/TutorVirtualPage'
import LunaPage from './pages/LunaPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/bazar" element={<BazarPage />} />
      <Route path="/tutor-virtual" element={<TutorVirtualPage />} />
      <Route path="/luna" element={<LunaPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
