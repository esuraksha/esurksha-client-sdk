import { hasConsent } from './store.js'

export function runConsentScripts() {
  const scripts = document.querySelectorAll(
    'script[type="text/plain"][data-es-consent]'
  )

  scripts.forEach(script => {
    const purposeCode = script.dataset.esConsent

    if (!hasConsent(purposeCode)) {
      return
    }

    const newScript = document.createElement('script')

    // Copy attributes
    Array.from(script.attributes).forEach(attr => {
      if (attr.name !== 'type') {
        newScript.setAttribute(attr.name, attr.value)
      }
    })

    newScript.src = script.src
    newScript.async = true

    script.parentNode.replaceChild(newScript, script)
  })
}
