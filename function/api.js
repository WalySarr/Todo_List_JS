export async function fetchApi(url, options = {}) {
    const headers = { accept: 'application/json', ...options.headers }
    const api = await fetch(url, { ...options, headers })
    if (api.ok) {
        return api.json()
    }
    throw new Error('Erreur Serveur', {cause : r})
}