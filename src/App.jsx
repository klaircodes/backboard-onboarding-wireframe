import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AppSignUp from './screens/AppSignUp.jsx'
import AppSignIn from './screens/AppSignIn.jsx'
import AppStart from './screens/AppStart.jsx'
import AppDashboard from './screens/AppDashboard.jsx'
import HackathonLanding from './screens/HackathonLanding.jsx'
import HackathonSignup from './screens/HackathonSignup.jsx'
import HackathonStart from './screens/HackathonStart.jsx'

function ToSignup() {
  const { search } = useLocation()
  return <Navigate to={`/hackathon/signup${search}`} replace />
}

// backboard.io/hackathon → app.backboard.io/hackathon/signup?path= → app.backboard.io/hackathon/start/{path}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/hackathon" replace />} />
      <Route path="/hackathon" element={<HackathonLanding />} />
      <Route path="/hackathon/signup" element={<HackathonSignup />} />
      <Route path="/hackathon/team" element={<ToSignup />} />
      <Route path="/hackathon/code" element={<ToSignup />} />
      <Route path="/hackathon/start/:path" element={<HackathonStart />} />
      <Route path="/signup" element={<AppSignUp />} />
      <Route path="/signin" element={<AppSignIn />} />
      <Route path="/start/:path" element={<AppStart />} />
      <Route path="/dashboard" element={<AppDashboard />} />
      <Route path="*" element={<Navigate to="/hackathon" replace />} />
    </Routes>
  )
}
