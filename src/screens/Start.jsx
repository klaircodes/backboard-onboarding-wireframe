import { Navigate, useParams } from 'react-router-dom'
import { Screen } from '../components/Wire.jsx'
import StartBody from '../components/StartBody.jsx'
import { isPath, PATHS } from '../data/paths.js'

const COMMON = [
  'This is the first page after auth. Not the dashboard.',
  'Video embedded in the page. Never navigates away.',
  'Success state: the dashboard shows the path connected and its section opens by default.',
]
const PER_PATH = {
  studio: [
    'Detect OS and architecture. Primary button is the user\'s platform; everything else is a text link.',
    'Auth handoff: Studio opens already signed in to this account. No key to paste, no second login.',
    'Activation event: studio_signed_in',
  ],
  rcli: [
    'Copy button on every command. Windows tab swaps in the PowerShell one-liner from docs.',
    'backboard login prints a URL, a short code and a QR code. Approval lands on this same account. No key paste.',
    'Show the exact terminal output the user should expect after each command. Real output, not illustrations.',
    'Activation event: rcli_login_completed',
  ],
  api: [
    'The three buttons are the one-click MCP installs that already exist under Integrations. Reuse them.',
    'Create the API key automatically on this page and inject it into the install link and snippet. Never make the user click Create API Key first.',
    'Today\'s modal becomes the secondary path, collapsed under "Or call it raw".',
    'Activation event: editor_connected or first_api_call',
  ],
}

export default function Start() {
  const { path } = useParams()
  if (!isPath(path)) return <Navigate to="/signup" replace />
  return (
    <Screen route={`/start/${path}`} title={`Start page, ${PATHS[path].title}`} notes={[...COMMON, ...PER_PATH[path]]}>
      <StartBody path={path} />
    </Screen>
  )
}
