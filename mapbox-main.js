mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhc3Rlcm50IiwiYSI6ImlwalZmdUkifQ.TJCtxxyNmRhvH-17afmGng';

var simpleconstants = {
  "@name": "{name_en}",
  "@sans": "Open Sans Regular, Arial Unicode MS Regular",
  "@sans-it": "Open Sans Italic, Arial Unicode MS Regular",
  "@sans-md": "Open Sans Semibold, Arial Unicode MS Bold",
  "@sans-bd": "Open Sans Bold, Arial Unicode MS Bold",
  "@big-label": "#cb4b49",
  "@medium-label": "#f27a87",
  "@small-label": "#384646",
  "@label-halo": "rgba(255,255,255,0.5)",
  "@label-halo-dark": "rgba(0,0,0,0.2)",
  "@land": "#ededed",
  "@water": "#7acad0",
  "@park": "#c2cd44",
  "@building": "#afd3d3",
  "@highway": "#5d6765",
  "@road": "#c0c4c2",
  "@path": "#5d6765",
  "@subway": "#ef7369",
  "@highway-width": {
    "base": 1.55,
    "stops": [[4, 0.5], [8, 1.5], [20, 40]]
  },
  "@road-width": {
    "base": 1.55,
    "stops": [[4, 0.25], [20, 30]]
  },
  "@path-width": {
    "base": 1.8,
    "stops": [[10, 0.15], [20, 15]]
  },
  "@road-misc-width": {
    "base": 1,
    "stops": [[4, 0.25], [20, 30]]
  },
  "@stream-width": {
    "base": 0.5,
    "stops": [[4, 0.5], [10, 1.5], [20, 5]]
  }
};

var simple = {
  "version": 8,
  "glyphs": "mapbox://fontstack/{fontstack}/{range}.pbf",


  "sources": {
    "osm": {
      "type": "vector",
      "tiles": ["https://vector.mapzen.com/osm/all/{z}/{x}/{y}.mvt?api_key=vector-tiles-LM25tq4"],
      "maxzoom": 18
    },
    "mapbox": {
      "url": "mapbox://mapbox.mapbox-streets-v7",
      "type": "vector"
    },
    "strava": {
      "type": "raster",
      "tiles": ["http://globalheat.strava.com/tiles/cycling/color3/{z}/{x}/{y}.png"],
      "tileSize": 256,
      "maxzoom": 17
    }
  },
  "layers": [{
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": simpleconstants["@land"]
      }
  }, {
      "id": "water-line",
      "source": "osm",
      "source-layer": "water",
      "type": "line",
      "filter": ["==", "$type", "LineString"],
      "paint": {
        "line-color": simpleconstants["@water"],
        "line-width": {
          "base": 1.2,
          "stops": [[8, 0.5], [20, 15]]
        }
      }
  }, {
      "id": "water-polygon",
      "source": "osm",
      "source-layer": "water",
      "type": "fill",
      "filter": ["==", "$type", "Polygon"],
      "paint": {
        "fill-color": simpleconstants["@water"]
      }
  }, {
      "id": "park",
      "type": "fill",
      "source": "osm",
      "source-layer": "landuse",
      "min-zoom": 6,
      "filter": ["in", "kind", "park", "forest", "garden", "grass", "farm", "meadow", "playground", "golf_course", "nature_reserve", "wetland", "wood", "cemetery"],
      "paint": {
        "fill-color": simpleconstants["@park"]
      }
  }, {
      "id": "river",
      "source": "osm",
      "source-layer": "water",
      "type": "line",
      "min-zoom": 6,
      "filter": ["all", ["==", "$type", "LineString"], ["==", "kind", "river"]],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": simpleconstants["@water"],
        "line-width": {
          "base": 1.2,
          "stops": [[8, 0.75], [20, 15]]
        }
      }
  }, {
      "id": "stream-etc",
      "source": "osm",
      "source-layer": "water",
      "type": "line",
      "min-zoom": 11,
      "filter": ["all", ["==", "$type", "LineString"], ["any", ["==", "kind", "stream"], ["==", "kind", "canal"]]],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": simpleconstants["@water"],
        "line-width": {
          "base": 1.4,
          "stops": [[10, 0.5], [20, 15]]
        }
      }
  }, {
      "id": "subways",
      "source": "osm",
      "source-layer": "roads",
      "type": "line",
      "paint": {
        "line-color": simpleconstants["@subway"],
        "line-dasharray": [2, 1]
      },
      "filter": ["==", "railway", "subway"]
  }, {
      "id": "link-tunnel",
      "source": "osm",
      "source-layer": "roads",
      "type": "line",
      "filter": ["any", ["==", "is_tunnel", "yes"]],
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": simpleconstants["@building"],
        "line-width": simpleconstants["@road-width"],
        "line-dasharray": [1, 2]
      }
  }, {
      "id": "buildings",
      "type": "fill",
      "source": "osm",
      "source-layer": "buildings",
      "paint": {
        "fill-outline-color": simpleconstants["@building"],
        "fill-color": simpleconstants["@land"]
      }
  }, {
      "id": "road",
      "source": "osm",
      "source-layer": "roads",
      "type": "line",
      "filter": ["any", ["==", "kind", "minor_road"], ["==", "kind", "major_road"]],
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": simpleconstants["@road"],
        "line-width": simpleconstants["@road-width"]
      }
  }, {
      "id": "link-bridge",
      "source": "osm",
      "source-layer": "roads",
      "type": "line",
      "filter": ["any", ["==", "is_link", "yes"], ["==", "is_bridge", "yes"]],
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": simpleconstants["@road"],
        "line-width": simpleconstants["@highway-width"],
      }
  }, {
      "id": "highway",
      "source": "osm",
      "source-layer": "roads",
      "type": "line",
      "line-join": "round",
      "filter": ["==", "kind", "highway"],
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": simpleconstants["@highway"],
        "line-width": simpleconstants["@highway-width"]
      }
  }, {
      "id": "path",
      "source": "osm",
      "source-layer": "roads",
      "type": "line",
      "line-join": "round",
      "line-cap": "round",
      "filter": ["==", "kind", "path"],
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "min-zoom": 12,
      "paint": {
        "line-color": simpleconstants["@path"],
        "line-width": simpleconstants["@path-width"],
        "line-dasharray": [2, 2]
      }
  }
  ]
};
var map = new mapboxgl.Map({
  container: 'map',
  style: simple,
  zoom: 15,
  minZoom: 2,
  center: [-71.0486, 42.3555]
});

map.on('load', function () {

  map.addLayer({
    "id": "strava-heatmap",
    "type": "raster",
    "source": "strava",
    "paint": {
      "raster-opacity": 1
    }
  });
  map.addLayer({
    "id": "buildings-3d",
    "type": "fill-extrusion",
    "filter": ["all", ["==", "$type", "Polygon"]],
    "source": "osm",
    "source-layer": "buildings",
    "paint": {
      "fill-extrusion-color": "#fff",
      "fill-extrusion-height": {
        "type": "identity",
        "property": "height",
        "default": 15
      }
    }
  });
});

//map.addControl(new mapboxgl.Navigation());
//if (window.self !== window.top) {
//  document.documentElement.className += ' mapzen-demo-iframed';
//}
