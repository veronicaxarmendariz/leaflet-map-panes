# leaflet-map-panes
Leaflet JS custom map panes, with CT town labels displayed on top of thematic polygon map

## Demo (designed for zoom levels 10-14)
http://jackdougherty.github.io/leaflet-map-panes/

## Requires
- Leaflet 1.x
- ArcGIS Online account (subscription)

## Overview of steps:
- Create ArcGIS map with town labels (hide boundaries from view)
- Publish as Tile Layer on ArcGIS Online service (subscription) http://www.arcgis.com/home/item.html?id=31c6f4f4360f4ab7b330b129086216de
- Use esri-leaflet to display labels as a base layer
- See Leaflet custom map panes tutorial to display layers as z-levels http://leafletjs.com/examples/map-panes.html

## Alternatives considered
- Also tried free CartoDB light labels only layer, but insufficient detail
- Also tried creating labels-only tile layer in Mapbox Studio Classic, and MapBox Studio, but appears to require a subscription beyond free level; this testing example comes from http://googlemapsmania.blogspot.com/2016/02/switching-map-labels-in-leaflet.html

## To Do
- Rebuild geojson data file for pop density
- change from click to hover, and add legend to display colors and hover data
