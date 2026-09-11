// Wizard draft: what the person has entered so far. Survives refresh; cleared when the account is created.
const KEY = 'bb_wire_draft'

export function getDraft() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

export function setDraft(patch) {
  const next = { ...getDraft(), ...patch }
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function clearDraft() {
  localStorage.removeItem(KEY)
}
