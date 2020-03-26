var CACHE_NAME = "bikeways-cache-v1";
var urlsToCache = [
    '/',
    '/styles.css',
    '/data/caryFacilities.geojson',
    '/data/caryGreenways.geojson',
    '/data/durham_shared.geojson',
    '/data/osm_durham.geojson',
    '/img/bike_lane.jpg',
    '/img/citrix.jpg',
    '/img/marginal-greenway-1.jpg',
    '/img/marginal-greenway-2.jpg',
    '/img/sidepath.jpg',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request)

                // TODO: FIGURE OUT A WAY TO MAKE CACHE EXPIRE

                // return fetch(event.request).then(
                //     function (response) {
                //         // Check if we received a valid response
                //         if (!response || response.status !== 200 || response.type !== 'basic') {
                //             return response;
                //         }

                //         // IMPORTANT: Clone the response. A response is a stream
                //         // and because we want the browser to consume the response
                //         // as well as the cache consuming the response, we need
                //         // to clone it so we have two streams.
                //         var responseToCache = response.clone();

                //         caches.open(CACHE_NAME)
                //             .then(function (cache) {
                //                 cache.put(event.request, responseToCache);
                //             });

                //         return response;
                //     }
                // );
            })
    );
});

self.addEventListener('activate', function (event) {

    var cacheWhitelist = [
        '/img/bike_lane.jpg',
        '/img/citrix.jpg',
        '/img/marginal-greenway-1.jpg',
        '/img/marginal-greenway-2.jpg',
        '/img/sidepath.jpg'
    ];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});