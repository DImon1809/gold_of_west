const cacheKey = "cache-1";

const data = [
  "./",
  "./serviceWorker.js",
  "./robots.txt",
  "./manifest.json",
  "./logo512.png",
  "./logo192.png",
  "./index.html",
  "./favicon.ico",
  "./asset-manifest.json",
  "./static/js/main.3257164f.js",
  "./static/js/main.3257164f.js.LICENSE.txt",
  "./static/js/main.3257164f.js.map",
  "./static/css/main.055c1e53.css",
  "./static/css/main.055c1e53.css.map",
  "./static/css/media/preview.a9bd0a667bc044be5ec6.png",
];

self.addEventListener("install", async () => {
  try {
    console.log("Installing...");

    const cache = await caches.open(cacheKey);

    cache.addAll(data);
  } catch (err) {
    console.error(err);
  }
});

self.addEventListener("activate", async (event) => {
  try {
    console.log("Service worker is activate...");

    await event.waitUntil(
      caches.keys().then((cacheKeys) => {
        return Promise.all(
          cacheKeys.map((key) => (key !== cacheKey ? caches.delete(key) : key))
        );
      })
    );
  } catch (err) {
    console.error(err);
  }
});

const cacheFirst = async (request) => {
  const cached = await caches.match(request);

  return cached ?? (await fetch(request));
};

self.addEventListener("fetch", async (event) => {
  try {
    console.log("Fetching data...");

    await event.respondWith(cacheFirst(event.request));
  } catch (err) {
    console.error(err);
  }
});
