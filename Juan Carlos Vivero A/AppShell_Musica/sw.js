//create AppShell
const _cache = 'meals@v1-cache';



self.addEventListener('install', (event) => {
    console.log('SW instalado');


    const _appShellFiles = [
        'index.html',
        'styles.css',
        'main.js',
        'app.js',
        'img/musicicon.jpg',
        'img/showcase2.jpg',
    ];


    const _openCache = async () => {
        const _appShellStorage = await caches.open(_cache);
        return _appShellStorage.addAll(_appShellFiles);

        
    };
    event.waitUntil(_openCache());
});


//Activacion


//1. cache Only
/*self.addEventListener('fetch', event => {
 //  event.respondWith(caches.match(event.request))
    // la funcion open abre un cache pero si no existe lo crea ////Abrir o crear
    //.match compara los archivos y responde
    // event.respondWith(caches.match(event.request))  vwerifica si la peticion es igual a algun recurso almacenado en cache
    //cache only solo responde a tomar recursos del cache
});*/

/*
//2. Network Only
// solo respondera de los datos que esten en Internet

self.addEventListener('fetch', event => {
    event.respondWith(event.request);
})
*/

//3 Cache First
/*self.addEventListener('fetch', event => {
    const response = caches.match(event.request).then(res => {
        console.log("Existe el request" + event.request);
        console.log(res)
    })
    .catch( res => {
        console.log("No existe el request" + event.request)
        console.log(res);
    })
 
      
 event.respondWith(
     caches.match(event.request).then(cachedResponse =>{
         
    if (cachedResponse) return cachedResponse;
    return fetch(event.request)
     })
    );    
    });*/


    //Network Firts
    self.addEventListener('fetch', event => {
        event.respondWith(
            fetch(event.request).then(networkResponse => {
                return networkResponse ||  caches.match(event.request)
            })
        );
    })
  
                
           


/*
self.addEventListener('activate', () =>{
    console.log('SW Activado');
});*/