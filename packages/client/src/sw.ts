/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="WebWorker" />
export type { };
declare const self: ServiceWorkerGlobalScope;

const cacheName = "game-cache";
const version = "v-1";
const CACHE_NAME = cacheName + version;
export const URLS: string[] = [
    "/",
    '/profile',
    '/forum',
    '/game',
    '/leaderboard',
    '/rules',
    '/rooms'
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(URLS);
        })
            .catch(err => {
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
            console.log('SW activate');
            return Promise.all(
                cacheNames
                    .filter(name => { return true })
                    .map(name => caches.delete(name))
            )
        })
    );
});
