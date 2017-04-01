// London
//var coords = [51.505, -0.09];

// NYC
//var coords = [40.739940, -73.988801];

// Boston
var coords = [42.3555, -71.0486];

var world = VIZI.world('world', {
 skybox: true,
 postProcessing: true
}).setView(coords);

// Set position of sun in sky
world._environment._skybox.setInclination(0.2);

// Add controls
VIZI.Controls.orbit().addTo(world);

// CartoDB basemap
VIZI.imageTileLayer('https://api.mapbox.com/styles/v1/blasternt/cj0ygqhje00002sqbfxj8zr9r/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYmxhc3Rlcm50IiwiYSI6ImlwalZmdUkifQ.TJCtxxyNmRhvH-17afmGng', {
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

//// Strava heatmap
//VIZI.imageTileLayer('http://globalheat.strava.com/tiles/cycling/color3/{z}/{x}/{y}.png', {
//  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
//  style: function(feature) {
//    blending: THREE.AdditiveBlending
//  }
//}).addTo(world);

// Buildings from Mapzen (polygons)
var topoJSONTileLayer = VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.topojson?api_key=mapzen-2D1pmqj', {
 interactive: false,
 style: function (feature) {
  var height;

  if (feature.properties.height) {
   height = feature.properties.height;
  } else {
   height = 10 + Math.random() * 10;
  }

  return {
   height: height,
   color: '#fff',
   lineWidth: 1,
   lineTransparent: true,
   lineOpacity: 0.2,
   lineBlending: THREE.AdditiveBlending,
   lineRenderOrder: 2
  };
 },
 filter: function (feature) {
  // Don't show points
  return feature.geometry.type !== 'Point';
 },
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
}).addTo(world);


// Cyclepaths from Mapzen (polygons and linestrings)
var topoJSONTileLayer = VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/roads/{z}/{x}/{y}.topojson?api_key=mapzen-2D1pmqj', {
 interactive: false,
 style: function (feature) {
  return {
   lineColor: '#4F8699',
   lineWidth: 4,
   lineTransparent: true,
   lineOpacity: 0.4,
   lineBlending: THREE.AdditiveBlending,
   lineRenderOrder: 2
  };
 },
 filter: function (feature) {
  // Don't show points
  return feature.geometry.type !== 'Point' && feature.properties["is_bicycle_related"] && !feature.properties["bicycle_network"];
 },
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
}).addTo(world);

// Cycle Routes from Mapzen (polygons and linestrings)
var topoJSONTileLayer = VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/roads/{z}/{x}/{y}.topojson?api_key=mapzen-2D1pmqj', {
 interactive: false,
 style: function (feature) {
   if (feature.properties["bicycle_network"] === 'icn') {
    lineColor = "#C04848";
   } else if (feature.properties["bicycle_network"] === 'ncn') {
    lineColor = "#006A4D";
   } else if (feature.properties["bicycle_network"] === 'rcn') {
    lineColor = "#6A5E72";
   } else if (feature.properties["bicycle_network"] === 'lcn') {
    lineColor = "#4F8699";
   }
  return {
   lineType: "line2d",
   lineColor: lineColor,
   lineWidth: 8,
   lineTransparent: false,
   lineOpacity: 0.6,
   lineBlending: THREE.NormalBlending,
   lineRenderOrder: 1
  };
 },
 filter: function (feature) {
  // Don't show points
  return feature.geometry.type !== 'Point' && feature.properties["bicycle_network"];
 },
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
}).addTo(world);

//// Buildings and roads from Mapzen (polygons and linestrings)
//var topoJSONTileLayer = VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/buildings,roads/{z}/{x}/{y}.topojson?api_key=mapzen-2D1pmqj', {
//  interactive: false,
//  style: function(feature) {
//    var height;
//
//    if (feature.properties.height) {
//      height = feature.properties.height;
//    } else {
//      height = 10 + Math.random() * 10;
//    }
//
//    return {
//      height: height,
//      color: '#fff',
//      lineColor: '#f7c616',
//      lineWidth: 1,
//      lineTransparent: true,
//      lineOpacity: 0.2,
//      lineBlending: THREE.AdditiveBlending,
//      lineRenderOrder: 2
//    };
//  },
//  filter: function(feature) {
//    // Don't show points
//    return feature.geometry.type !== 'Point';
//  },
//  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
//}).addTo(world);

// London Underground lines
//VIZI.geoJSONLayer('https://rawgit.com/robhawkes/4acb9d6a6a5f00a377e2/raw/30ae704a44e10f2e13fb7e956e80c3b22e8e7e81/tfl_lines.json', {
//  output: true,
//  interactive: true,
//  style: function(feature) {
//    var colour = feature.properties.lines[0].colour || '#ffffff';
//
//    return {
//      lineColor: colour,
//      lineHeight: 20,
//      lineWidth: 3,
//      lineTransparent: true,
//      lineOpacity: 0.5,
//      lineBlending: THREE.AdditiveBlending,
//      lineRenderOrder: 2
//    };
//  },
//  onEachFeature: function(feature, layer) {
//    layer.on('click', function(layer, point2d, point3d, intersects) {
//      console.log(layer, point2d, point3d, intersects);
//    });
//  },
//  attribution: '&copy; Transport for London.'
//}).addTo(world);
