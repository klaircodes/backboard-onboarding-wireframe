// Wireframe stand-ins for analytics + the account record.
// Events match spec slide 20. Real build: send to the analytics pipeline; here they log to console
// and to window.__events so the notes panel can show them.
const ACCOUNT_KEY = 'bb_wire_account'

export function track(event, props = {}) {
  const entry = { event, ...props, at: new Date().toISOString() }
  console.log('[track]', event, props)
  window.__events = (window.__events || []).concat(entry)
  window.dispatchEvent(new CustomEvent('bb:track', { detail: entry }))
}

export function getAccount() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNT_KEY))
  } catch {
    return null
  }
}

export function saveAccount(account) {
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account))
  window.dispatchEvent(new CustomEvent('bb:account'))
}

export function updateAccount(patch) {
  const next = { ...(getAccount() || {}), ...patch }
  saveAccount(next)
  return next
}

export function clearAccount() {
  localStorage.removeItem(ACCOUNT_KEY)
  window.__events = []
  window.dispatchEvent(new CustomEvent('bb:account'))
}
