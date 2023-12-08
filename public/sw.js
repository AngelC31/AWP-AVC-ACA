const cacheName="news-V1";
const staticAssets=[
    './',
    './index.js',
    './index.html',
    './manifest.webmanifest',
    './app.js'

]
self.addEventListener("install",async e=>{
    const cache=await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate',e=>{
    self.clients.claim();
});

self.addEventListener('fetch', async (e) => {
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    try {
        const cached = await cache.match(req);
        if (cached) {
            return cached;
        }
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        console.error('Error fetching from cache:', error);
        throw error;
    }
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        const cached = await cache.match(req);
        if (cached) {
            return cached;
        }
        console.error('Error fetching from network:', error);
        throw error;
    }
}
