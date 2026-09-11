import { Navigate, useParams } from 'react-router-dom'
import { Screen } from '../components/Wire.jsx'
import CreditsBanner from '../components/CreditsBanner.jsx'
import HackathonLinks from '../components/HackathonLinks.jsx'
import StartBody from '../components/StartBody.jsx'
import { isPath, PATHS } from '../data/paths.js'
import { getAccount } from '../lib/track.js'

const NOTES = [
  'Credits banner first. Team size shown so every member knows they are covered.',
  'Then the same win as the app start page: download, curl, or connect. Same components, same videos, same events with hackathon=true.',
  'Hackathon links below the win: submit, judging criteria, mentor channel, docs.',
  'Emailed to every team member as hackathon E1 for this path.',
]

export default function HackathonStart() {
  const { path } = useParams()
  if (!isPath(path)) return <Navigate to="/hackathon" replace />
  const account = getAccount()
  return (
    <Screen route={`/hackathon/start/${path}`} title={`Hackathon, step 3, ${PATHS[path].title}`} notes={NOTES}>
      <div className="stack" style={{ gap: 28, maxWidth: 760 }}>
        <CreditsBanner team={account?.team ?? 3} />
        <StartBody path={path} hackathon hideSkip />
        <hr className="rule" style={{ margin: 0 }} />
        <HackathonLinks />
      </div>
    </Screen>
  )
}
