let CONSENTS = []

export function saveConsents(consents) {
  CONSENTS = consents
}

export function getConsents() {
  return CONSENTS
}

export function hasConsent(code) {
  const c = CONSENTS.find(c => c.code === code)
  return !!(
    c &&
    c.consent_given === true &&
    !c.revoked_at
  )
}
