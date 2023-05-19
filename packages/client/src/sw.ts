/// <reference lib="WebWorker" />

// export empty type because of tsc --isolatedModules flag
export type { };
declare const self: ServiceWorkerGlobalScope;

const cacheName = "game-cache";
const version = "v-1";

const CACHE_NAME = cacheName + version;
export const URLS: string[] = [
    "./index.html"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("Opened cache");
            return cache.addAll(URLS);
        })
            .catch(err => {
                console.log(err);
                throw err;
            })
    );
});

self.addEventListener("fetch", function (event) {
    const request = event.request;
    if (request.method !== "GET") {
        return event.respondWith(fetch(event.request));
    }
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                const fetchRequest = event.request.clone();
                return fetch(fetchRequest)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                    );
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => { return true })
                    .map(name => caches.delete(name))
            )
        })
    );
});
