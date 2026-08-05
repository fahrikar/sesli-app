/* Sesli App — service worker
   Strateji: ÖNCE AĞ, sonra önbellek.
   Böylece her açılışta güncel sürüm iner; internet yoksa son kopya açılır.
   (Cache-first kullanılmıyor: eski sürümün telefonda takılı kalmasını istemiyoruz.) */
const SURUM='sesli-v34';
const KABUK=[
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable.png'
];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(SURUM)
      .then(c=>c.addAll(KABUK).catch(()=>{}))   // biri düşerse kurulum yine de sürsün
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(k=>Promise.all(k.filter(x=>x!==SURUM).map(x=>caches.delete(x))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;

  // Firebase gerçek zamanlı bağlantısı önbelleklenmemeli
  if(/firebaseio|googleapis|gstatic\.com\/firebasejs/.test(req.url))return;
  // Sürüm dosyası HER ZAMAN sunucudan okunur; önbelleğe hiç girmez
  if(/surum\.json/.test(req.url))return;

  // Sayfa isteğinde tarayıcı önbelleğini atla: GitHub Pages HTML'i 10 dk
  // önbelleğe alıyor, aksi halde güncelleme geç iniyor.
  const istek=(req.mode==='navigate'||/\.(html|json|js)$/.test(new URL(req.url).pathname))
    ? new Request(req.url,{cache:'no-cache',credentials:'same-origin'})
    : req;

  e.respondWith(
    fetch(istek)
      .then(res=>{
        // başarılı yanıtı kopyala ve sakla (offline yedeği)
        if(res&&res.status===200&&(res.type==='basic'||res.type==='cors')){
          const kopya=res.clone();
          caches.open(SURUM).then(c=>c.put(req,kopya)).catch(()=>{});
        }
        return res;
      })
      .catch(()=>
        caches.match(req).then(c=>{
          if(c)return c;
          // sayfa isteğiyse en azından kabuğu ver
          if(req.mode==='navigate')return caches.match('./index.html');
          return new Response('',{status:504,statusText:'Çevrimdışı'});
        })
      )
  );
});

/* Sayfa "hemen güncelle" derse bekleyen sürümü devreye al */
self.addEventListener('message',e=>{ if(e.data==='guncelle')self.skipWaiting(); });
