// Kill-switch: reemplaza el service worker viejo de Monetag.
// El navegador de cada usuario revisa este archivo automáticamente (aunque no entre a tu web)
// y al encontrar esta versión cancela las notificaciones push y se elimina solo.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    try {
      var sub = await self.registration.pushManager.getSubscription();
      if (sub) await sub.unsubscribe();
    } catch (e) {}
    try {
      var keys = await caches.keys();
      await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
    try {
      var clientsList = await self.clients.matchAll({ type: 'window' });
      clientsList.forEach(function (c) { c.navigate(c.url); });
    } catch (e) {}
  })());
});
// Ignora cualquier push que aún llegue: no muestra ningún anuncio.
self.addEventListener('push', function (event) { event.stopImmediatePropagation(); });
self.addEventListener('fetch', function () {});
