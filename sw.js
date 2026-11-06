const CACHE_NAME = "afrikora-offline-v2";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    } catch (error) {}
    try {
      await cache.add(new Request("/", { cache: "reload" }));
    } catch (error) {}
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => key.startsWith("afrikora-") && key !== CACHE_NAME)
        .map((key) => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);

        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put("/", response.clone());
        }

        return response;
      } catch (error) {
        const cache = await caches.open(CACHE_NAME);

        return (
          await cache.match(request) ||
          await cache.match("/") ||
          await cache.match(OFFLINE_URL) ||
          new Response(
            "Vous êtes hors connexion. Reconnectez-vous pour utiliser AFRIKORA.",
            {
              status: 503,
              headers: { "Content-Type": "text/plain; charset=utf-8" }
            }
          )
        );
      }
    })());

    return;
  }

  event.respondWith((async () => {
    try {
      const response = await fetch(request);

      if (response && response.ok && response.type === "basic") {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }

      return response;
    } catch (error) {
      return (await caches.match(request)) || Response.error();
    }
  })());
});
