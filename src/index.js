import { setConfig } from './config.js'
import { fetchPurposes, fetchUserConsents } from './api.js'
import { showBanner } from './banner.js'
import { saveConsents, getConsents } from './store.js'

import { runConsentScripts } from './script-manager.js'


async function init(config) {
  setConfig(config)

  const purposes = await fetchPurposes()
  const userConsents = await fetchUserConsents()

  saveConsents(userConsents)
  runConsentScripts()

  // Detect missing or outdated consent
  const pending = purposes.filter(p => {
    const consent = userConsents.find(u => u.code === p.code)
    // No consent record → needs consent
  if (!consent) return true

  // Explicitly revoked → needs consent
  if (!consent.consent_given) return true

  // Version mismatch → needs re-consent
  if (consent.consent_version < p.version) return true

  return false
  })

  if (pending.length > 0) {
    showBanner(pending)
  }
}

export default{
  init
}