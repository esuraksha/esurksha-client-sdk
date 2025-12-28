import { submitConsent } from './api.js'
import { runConsentScripts } from './script-manager.js'


export function showBanner(purposes) {
  const banner = document.createElement('div')
  banner.style = `
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #111;
    color: #fff;
    padding: 20px;
    z-index: 9999;
  `

  banner.innerHTML = `
    <h3>Privacy Preferences</h3>
    ${purposes.map(p => `
      <label>
        <input type="checkbox" data-code="${p.code}">
        ${p.description}
      </label><br/>
    `).join('')}
    <button id="es-save">Save</button>
  `

  document.body.appendChild(banner)

  document.getElementById('es-save').onclick = async () => {
    const inputs = banner.querySelectorAll('input[type=checkbox]')
    for (const input of inputs) {
      await submitConsent(input.dataset.code, input.checked)
    }
    banner.remove()
    runConsentScripts()
  }
}
