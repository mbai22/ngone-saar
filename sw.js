const CACHE = 'ngon-saar-v1'
const PRECACHE_URLS = [
  '/ngon-saar/',
  '/ngon-saar/index.html',
  '/ngon-saar/about.html',
  '/ngon-saar/music.html',
  '/ngon-saar/gallery.html',
  '/ngon-saar/boutique.html',
  '/ngon-saar/contact.html',
  '/ngon-saar/presse.html',
  '/ngon-saar/assets/css/style.css',
  '/ngon-saar/assets/js/script.js',
  '/ngon-saar/manifest.json'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)
  const isHTML = event.request.headers.get('Accept')?.includes('text/html')
  const isSameOrigin = url.origin === location.origin

  if (!isSameOrigin) return

  if (isHTML) {
    event.respondWith(networkFirst(event.request))
  } else {
    event.respondWith(cacheFirst(event.request))
  }
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response.ok) {
    const cache = await caches.open(CACHE)
    cache.put(request, response.clone())
  }
  return response
}

async function networkFirst(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(CACHE)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request)
    return cached || new Response('Offline', { status: 503 })
  }
}
