var map = L.map('map');

var layer = Tangram.leafletLayer({
  scene: 'scene.yaml'
});

layer.addTo(map);

map.setView([40.70531887544228, -74.00976419448853], 15);
