/* Service worker — يجعل التطبيق يعمل دون إنترنت. غيّر رقم الإصدار عند أي تحديث للملفات. */
const VERSION = 'quran-v11';
const SHELL = [
  './', 'index.html', 'splash.js', 'quran-data.js', 'manifest.json', 'privacy.html', 'terms.html',
  'fonts/amiri-quran-arabic-400-normal.woff2', 'fonts/cairo-arabic-400-normal.woff2', 'fonts/cairo-arabic-600-normal.woff2',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-192.png', 'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png', 'icons/favicon-32.png', 'muadhin.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c =>
    /* كل ملف على حدة: غياب ملف (مثل muadhin.jpg) لا يُفشل التثبيت */
    Promise.all(SHELL.map(u => c.add(u).catch(() => {})))
  ).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;   /* الشبكة الخارجية (Quran.com) لا تُعترض */
  e.respondWith(
    caches.open(VERSION).then(async c => {
      const hit = await c.match(req, { ignoreSearch: true });
      const net = fetch(req).then(r => { if (r && r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
      if (hit) { e.waitUntil(net); return hit; }                         /* من الذاكرة فورًا، وتحديث خلفي */
      const r = await net;
      if (r) return r;
      if (req.mode === 'navigate') return (await c.match('index.html')) || Response.error();
      return Response.error();
    })
  );
});
