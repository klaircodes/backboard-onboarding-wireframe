import { useSearchParams } from 'react-router-dom'
import { isPath } from '../data/paths.js'

// Reads ?path= from the URL. Returns [path | null, setPath].
export function usePathParam() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('path')
  const path = isPath(raw) ? raw : null
  const setPath = (next) => {
    const copy = new URLSearchParams(params)
    if (next) copy.set('path', next)
    else copy.delete('path')
    setParams(copy, { replace: true })
  }
  return [path, setPath, raw]
}
