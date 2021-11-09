//Create Appshell
const _n_cache = "cache-v2.9";

  const _files = ["./index.html", "./style.css", "./main.js", "./app.js"];

  

self.addEventListener("install", (event) => {
    const _app_shell = caches
      .open(_n_cache)
      .then((cache) => cache.addAll(_files));
  
    event.waitUntil(_app_shell);
  
  });

//Activación
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheList) => {
      return Promise.all(
        cacheList.map((cache) => {
          if (!_n_cache.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  //console.log("ACTIVATE");
});

//Cache ONLY
/*self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request))
});*/

//Network ONLY
/*self.addEventListener('fetch',event =>{
    event.respondWith(fetch(event.request))
});*/

//Network First
/*self.addEventListener('fetch', event => {
        event.respondWith(
            fetch(event.request).then(networkResponse => {
                return networkResponse ||  caches.match(event.request)
            })
        );
    });*/

//3 Cache First
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request);
    })
  );
});
