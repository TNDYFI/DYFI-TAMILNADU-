/* DYFI Tamil Nadu service worker: offline shell. Bump V to force a refresh of cached files. */
const V = "dyfi-v6";
const CORE = ["./", "index.html", "about.html", "team.html", "contact.html", "careers.html", "chatbot.html", "terms/faq.html", "constitution.html", "terms/tac.html", "offline.html",
  "assets/css/dyfi.css", "assets/css/app.css", "assets/css/skeu.css", "assets/css/constitution.css", "assets/js/constitution.js", "assets/js/dyfi.js", "assets/js/app.js", "assets/js/leaders.js", "assets/js/leaders-data.js", "assets/vendor/bootstrap/css/bootstrap.min.css", "assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
  "assets/images/red.png", "assets/images/emblem.png", "assets/images/p1.webp", "assets/images/p2.webp", "assets/images/p3.webp"];
const FONTS = /^(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/;
self.addEventListener("install", e => e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => clients.claim())));
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.pathname.endsWith(".pdf")) return;
  if (r.mode === "navigate" && u.origin === location.origin) {
    e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); return res; })
      .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match("offline.html"))));
    return;
  }
  if (u.origin !== location.origin && !FONTS.test(u.hostname)) return;
  e.respondWith(caches.match(r).then(m => {
    const net = fetch(r).then(res => { if (res.ok || res.type === "opaque") { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); } return res; }).catch(() => m);
    return m || net;
  }));
});
