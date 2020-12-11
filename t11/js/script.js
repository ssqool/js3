'use strict'

mapboxgl.accessToken = 'pk.eyJ1Ijoic3Nxb29sIiwiYSI6ImNraWplbms2dDAxeHoycnA4czNuMHZvMHYifQ.ZHj3Eb9wzbS5HcPlhVN7NQ';
let coordinates = document.getElementById('coordinates');
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 13,
  center: [165.973, -50.604167],
});
//add marker
let marker = new mapboxgl.Marker({
  draggable: true
}).setLngLat([30.4631175, 50.469765]).addTo(map);

// Add search bar
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

// Add geolocate control to the map.
let mapGeolocation = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  trackUserLocation: true
})
map.addControl(mapGeolocation);

//turn off draggable marker

mapGeolocation.on('trackuserlocationstart', () => {
  marker?.remove();
});

//turns back
mapGeolocation.on('trackuserlocationend', () => {
  let { lng, lat } = map.getCenter();

  marker = new mapboxgl.Marker({
    draggable: true
  }).setLngLat([lng, lat]).addTo(map);
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

//current map center coordinates
map.on('move', () => {
  let { lng, lat } = map.getCenter();

  coordinates.innerHTML = `Longitude: ${lng}<br />Latitude: ${lat}`;
});
