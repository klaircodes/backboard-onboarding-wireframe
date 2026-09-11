import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import SignUp from './screens/SignUp.jsx'
import SignIn from './screens/SignIn.jsx'
import Start from './screens/Start.jsx'
import Dashboard from './screens/Dashboard.jsx'
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
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/start/:path" element={<Start />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/hackathon" replace />} />
    </Routes>
  )
}
