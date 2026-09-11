import { Navigate, useParams } from 'react-router-dom'
import { Page, StepBar } from '../components/Wire.jsx'
import CreditsBanner from '../components/CreditsBanner.jsx'
import HackathonLinks from '../components/HackathonLinks.jsx'
import StartBody from '../components/StartBody.jsx'
import { isPath } from '../data/paths.js'
import { getAccount } from '../lib/track.js'

// Step 3. Credits banner, the win, the video, hackathon links.
export default function HackathonStart() {
  const { path } = useParams()
  if (!isPath(path)) return <Navigate to="/hackathon" replace />
  const account = getAccount()
  return (
    <Page narrow>
      <StepBar current={3} />
      <CreditsBanner team={account?.hackathon ? account.team : 3} />
      <StartBody path={path} hackathon />
      <HackathonLinks />
    </Page>
  )
}
