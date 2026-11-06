self.addEventListener("install", (event) => {
self.skipWaiting();
});

self.addEventListener("activate", (event) => {
event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
if (event.request.method !== "GET") return;

event.respondWith(
fetch(event.request).catch(() => {
return new Response(
"Vous êtes hors connexion. Reconnectez-vous pour utiliser AFRIKORA.",
{
headers: { "Content-Type": "text/plain; charset=utf-8" }
}
);
})
);
});
