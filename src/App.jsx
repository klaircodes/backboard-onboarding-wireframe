import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import SignUp from './screens/SignUp.jsx'
import SignIn from './screens/SignIn.jsx'
import Start from './screens/Start.jsx'
import Dashboard from './screens/Dashboard.jsx'
import HackathonLanding from './screens/HackathonLanding.jsx'
import HackathonTeam from './screens/HackathonTeam.jsx'
import HackathonCode from './screens/HackathonCode.jsx'
import HackathonStart from './screens/HackathonStart.jsx'

function LegacySignup() {
  const { search } = useLocation()
  return <Navigate to={`/hackathon${search}`} replace />
}

// Hackathon wizard: Path › Team › Code › Start. App sign-up screens stay reachable by URL.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/hackathon" replace />} />
      <Route path="/hackathon" element={<HackathonLanding />} />
      <Route path="/hackathon/team" element={<HackathonTeam />} />
      <Route path="/hackathon/code" element={<HackathonCode />} />
      <Route path="/hackathon/signup" element={<LegacySignup />} />
      <Route path="/hackathon/start/:path" element={<HackathonStart />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/start/:path" element={<Start />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/hackathon" replace />} />
    </Routes>
  )
}
