import { getConfig } from './config.js'

export async function fetchPurposes() {
  const { apiBaseUrl, tenantId, token } = getConfig()

  const res = await fetch(`${apiBaseUrl}/user/consents/purposes`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-tenant-id': tenantId
    }
  })

  return res.json()
}

export async function fetchUserConsents() {
  const { apiBaseUrl, tenantId, token } = getConfig()

  const res = await fetch(`${apiBaseUrl}/user/consents`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-tenant-id': tenantId
    }
  })

  return res.json()
}

export async function submitConsent(code, granted) {
  const { apiBaseUrl, tenantId, token } = getConfig()

  return fetch(`${apiBaseUrl}/user/consents`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-tenant-id': tenantId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      consentCode: code,
      granted
    })
  })
}
