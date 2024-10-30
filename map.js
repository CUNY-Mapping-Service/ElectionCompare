//////////////////////////////////////////////////
//Prep map initialization///
//////////////////////////////////////////////////
const mapboxKey = 'pk.eyJ1Ijoid2ZpZWxkLWN1bnkiLCJhIjoiY2p6YTJnN2lzMDB1aDNicm9qbzN6d2F5dCJ9.eOQlPpQf5uyOJANVWurDDA'

const transformRequest = (url, resourceType) => {
    if (isMapboxURL(url)) {
        return transformMapboxUrl(url, resourceType, mapboxKey)
    }
    return { url }
}

//////////////////////////////////////////////////
//Create 2020 Map//
//////////////////////////////////////////////////
var _2020 = new maplibregl.Map({
    container: "before",
    style: "mapbox://styles/wfield-cuny/cl0s6ydly000014nmcial1tgu",
    center: [-73.9438, 40.7811],
    zoom: 8.5,
    transformRequest
});

_2020.on('styledata', () => {
    _2020.addSource('2020_results_src', {
        'type': 'geojson',
        'data': '2020.geojson'
    })
    _2020.addLayer({
        'id': '2020_results',
        'type': 'fill',
        'source': '2020_results_src',
        'layout': {},
        'paint': {
            'fill-color': fillExp,
            'fill-opacity': 0.8
        }
    }, 'airport-label');
})

//////////////////////////////////////////////////
//Create 2024 map//
//////////////////////////////////////////////////
var _2024 = new maplibregl.Map({
    container: "after",
    style: "mapbox://styles/wfield-cuny/cl0s6ydly000014nmcial1tgu",
    center: [-73.9438, 40.7811],
    zoom: 8.5,
    transformRequest
});

_2024.on('styledata', () => {
    _2024.addSource('2024_results_src', {
        'type': 'geojson',
        'data': '2024.geojson'
    })
    _2024.addLayer({
        'id': '2024_results',
        'type': 'fill',
        'source': '2024_results_src',
        'layout': {},
        'paint': {
            'fill-color': fillExp,
            'fill-opacity': 0.8
        }
    }, 'airport-label');
});

//////////////////////////////////////////////////
//Make Comparison///
//////////////////////////////////////////////////
var container = "#comparison-container";

var map = new maplibregl.Compare(_2020, _2024, container, {
    // Set this to enable comparing two maps by mouse movement:
    // m ousemove: true
});

//////////////////////////////////////////////////
//Hover///
//////////////////////////////////////////////////
_2024.on('mousemove', '2024_results', (e) => {
    // Change the cursor style as a UI indicator.
    _2024.getCanvas().style.cursor = 'pointer';

    const _2020Info = _2020.queryRenderedFeatures(e.point, { layers: ['2020_results'] });
    store.setHoveredDistricts(_2020Info[0].properties, e.features[0].properties);
});

_2024.on('mouseleave', '2024_results', () => {
    _2024.getCanvas().style.cursor = '';
});

_2020.on('mousemove', '2020_results', (e) => {
    // Change the cursor style as a UI indicator.
    _2020.getCanvas().style.cursor = 'pointer';
    const _2024Info = _2024.queryRenderedFeatures(e.point, { layers: ['2024_results'] });
    store.setHoveredDistricts(_2024Info[0].properties, e.features[0].properties);
});

_2020.on('mouseleave', '2020_results', () => {
    _2020.getCanvas().style.cursor = '';
});