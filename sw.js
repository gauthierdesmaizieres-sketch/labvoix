// Network first, cache as fallback: the app still opens with no Wi-Fi in the lab,
// and an update on GitHub is picked up at the next online launch.
const CACHE = 'labvoix-v1';
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); return r; })
      .catch(() => caches.match(e.request))
  );
});
