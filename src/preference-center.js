import { fetchPurposes, fetchUserConsents, submitConsent } from './api.js'
import { saveConsents, getConsents } from './store.js'
import { runConsentScripts } from './script-manager.js'

let container = null

export async function openPreferenceCenter() {
  if (container) return

  const purposes = await fetchPurposes()
  const userConsents = await fetchUserConsents()

  saveConsents(userConsents)

  container = document.createElement('div')
  container.style = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 999999;
  `

  const panel = document.createElement('div')
  panel.style = `
    background: white;
    max-width: 500px;
    margin: 5% auto;
    padding: 20px;
    border-radius: 8px;
  `

  panel.innerHTML = `
    <h2>Privacy Preferences</h2>
    ${purposes.map(p => {
      const consent = userConsents.find(c => c.code === p.code)
      const checked = consent?.consent_given ? 'checked' : ''
      const disabled = p.is_mandatory ? 'disabled' : ''

      return `
        <div>
          <label>
            <input
              type="checkbox"
              data-code="${p.code}"
              ${checked}
              ${disabled}
            />
            <strong>${p.code}</strong><br/>
            <small>${p.description}</small>
          </label>
        </div>
        <hr/>
      `
    }).join('')}
    <button id="es-save">Save</button>
    <button id="es-close">Close</button>
  `

  container.appendChild(panel)
  document.body.appendChild(container)

  document.getElementById('es-close').onclick = close
  document.getElementById('es-save').onclick = save
}

async function save() {
  const inputs = container.querySelectorAll('input[type=checkbox]')

  for (const input of inputs) {
    await submitConsent(input.dataset.code, input.checked)
  }

  const updated = await fetchUserConsents()
  saveConsents(updated)
  runConsentScripts()
  close()
}

function close() {
  container.remove()
  container = null
}
