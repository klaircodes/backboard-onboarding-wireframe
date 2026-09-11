import { Navigate, useParams } from 'react-router-dom'
import { Page } from '../components/Wire.jsx'
import StartBody from '../components/StartBody.jsx'
import { isPath } from '../data/paths.js'

// Slides 8–10. First page after auth.
export default function Start() {
  const { path } = useParams()
  if (!isPath(path)) return <Navigate to="/signup" replace />
  return (
    <Page panelClass="narrow">
      <StartBody path={path} />
    </Page>
  )
}
