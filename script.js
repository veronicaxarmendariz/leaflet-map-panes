// Map panes requires Leaflet 1.x
// See Leaflet tutorial http://leafletjs.com/examples/map-panes.html
// template by http://github.com/jackdougherty/leaflet-map/

// set up the map center and zoom level
var map = L.map('map', {
  center: [41.7, -72.7], // [41.5, -72.7] for Connecticut; [41.76, -72.67] for Hartford county or city
  zoom: 10, // zoom 9 for Connecticut; 10 for Hartford county, 12 for Hartford city
  zoomControl: false // add later to reposition
});

// customize link to view source code; add your own GitHub repository
map.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map-panes">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

// This pane is above markers but below popups
// see default pane z-index levels: https://github.com/Leaflet/Leaflet/blob/master/dist/leaflet.css#L73
map.createPane('labels');
map.getPane('labels').style.zIndex = 650;

// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';

// optional: add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "bottomright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
}).addTo(map);

// REMOVE AFTER MAP CONSTRUCTION: optional Zoom Label (also in index.html)
L.control.zoomLabel().addTo(map);

// optional: reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map);

/* BASELAYERS */
var lightNoLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

// ArcGIS Online tile layer, hosted on subscription service http://trincoll.maps.arcgis.com
var arcGISLabels = L.esri.tiledMapLayer({
    url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/ConnecticutTownLabels/MapServer",
    pane: 'labels'
}).addTo(map);
controlLayers.addBaseLayer(arcGISLabels, 'ArcGIS Online Labels'); // replaced addOverlay with addBaseLayer for radio buttons

// free CartoDB labels only layer, but insufficient detail
var lightOnlyLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    pane: 'labels'
});
controlLayers.addBaseLayer(lightOnlyLabels, 'CartoDB Labels');

// Mapbox
var mapboxLabels = L.tileLayer('https://{s}.tiles.mapbox.com/v3/gmapsmania.f8637bc8/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    pane: 'labels'
});
controlLayers.addBaseLayer(mapboxLabels, 'GMapsMania Mapbox Labels'); // originally: addOverlay






/* POLYGON OVERLAY */
// load polygon geojson, using data to define fillColor, from local directory
// *TO DO* rebuild file for pop density
// *TO DO* change from click to hover, and add legend to display colors and hover data
$.getJSON("polygons.geojson", function (data) {   // insert pathname to your local directory file
  var geoJsonLayer = L.geoJson(data, {
    style: function (feature) {
      var fillColor,
        population = feature.properties.Pop2010;
      if (population > 100000) fillColor = "#006837";
      else if (population > 50000) fillColor ="#31a354";
      else if (population > 15000) fillColor ="#78c679";
      else if (population > 5000) fillColor ="#c2e699";
      else if (population > 0) fillColor ="#ffffcc";
      else fillColor = "#f7f7f7"; // no data
      return {
        'color': 'red',
        'weight': 2,
        'fillColor': fillColor, // sorts by method above
        'fillOpacity': 0.8
      }
    },
    onEachFeature: function( feature, layer) {
      var popupText = "<b>" + feature.properties.Town + "</b>"   // replace labels with those from your own geojson
         + "<br>Population 2010: " + "<br>" + feature.properties.Pop2010;
      layer.bindPopup(popupText);
    }
  }).addTo(map);
  controlLayers.addOverlay(geoJsonLayer, 'CT Pop 2010');  // insert your 'Title' to add to legend
});
