import { Routes, Route, Navigate } from 'react-router-dom'
import FlowMap from './screens/FlowMap.jsx'
import SignUp from './screens/SignUp.jsx'
import SignIn from './screens/SignIn.jsx'
import Start from './screens/Start.jsx'
import Dashboard from './screens/Dashboard.jsx'
import HackathonLanding from './screens/HackathonLanding.jsx'
import HackathonForm from './screens/HackathonForm.jsx'
import HackathonStart from './screens/HackathonStart.jsx'

// Route map mirrors the spec deck (Backboard_Onboarding_Flow_v2_Sept2026).
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FlowMap />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/start/:path" element={<Start />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/hackathon" element={<HackathonLanding />} />
      <Route path="/hackathon/signup" element={<HackathonForm />} />
      <Route path="/hackathon/start/:path" element={<HackathonStart />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
