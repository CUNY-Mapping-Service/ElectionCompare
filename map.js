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
let hovered2020PolygonId = null;
let hovered2024PolygonId = null;
var _2020 = new maplibregl.Map({
    container: "before",
    style: "mapbox://styles/wfield-cuny/cl0s6ydly000014nmcial1tgu",
    center: [-73.9438, 40.7811],
    zoom: 8.5,
    transformRequest
});

_2020.on('styledata', () => {
    if (!_2020.getSource('results_src')) {
        _2020.addSource('results_src', {
            'type': 'geojson',
            'data': 'results.geojson',
            'promoteId': 'aded24'
        })
        _2020.addLayer({
            'id': '2020_results',
            'type': 'fill',
            'source': 'results_src',
            'layout': {},
            'paint': {
                'fill-color': fillExp20,
                'fill-opacity': 0.8
            }
        }, 'airport-label');
        _2020.addLayer({
            'id': '2020_results-line',
            'type': 'line',
            'source': 'results_src',
            'layout': {},
            'paint': {
                'line-color': '#0fff',
                'line-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    3,
                    0
                ]
            }
        }, 'airport-label');
    }
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
    if (!_2024.getSource('results_src')) {
        _2024.addSource('results_src', {
            'type': 'geojson',
            'data': 'results.geojson',
            'promoteId': 'aded24'
        })
        _2024.addLayer({
            'id': '2024_results',
            'type': 'fill',
            'source': 'results_src',
            'layout': {},
            'paint': {
                'fill-color': fillExp24,
                'fill-opacity': 0.8
            }
        }, 'airport-label');

        _2024.addLayer({
            'id': '2024_results-line',
            'type': 'line',
            'source': 'results_src',
            'layout': {},
            'paint': {
                'line-color': '#0fff',
                'line-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    3,
                    0
                ]
            }
        }, 'airport-label');
    }
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
let swiper = false;
document.getElementsByClassName('compare-swiper-vertical')[0].addEventListener('mouseenter', () => {
    swiper = true;
    Array.from(document.getElementsByClassName('table-container')).forEach(e => e.style.display = 'inline-block')

});
document.getElementsByClassName('compare-swiper-vertical')[0].addEventListener('mouseleave', () => {
    swiper = false;

});
_2024.on('mousemove', '2024_results', (e) => {
    Array.from(document.getElementsByClassName('table-container')).forEach(e => e.style.display = 'inline-block')
    if (swiper) return;
    if (hovered2020PolygonId !== null) {
        _2020.setFeatureState(
            { source: 'results_src', id: hovered2020PolygonId },
            { hover: false }
        );
    }
    if (e.features.length > 0) {
        if (hovered2024PolygonId !== null) {
            _2024.setFeatureState(
                { source: 'results_src', id: hovered2024PolygonId },
                { hover: false }
            );
        }
        hovered2024PolygonId = e.features[0].id;
        _2024.setFeatureState(
            { source: 'results_src', id: hovered2024PolygonId },
            { hover: true }
        );
    }
    // Change the cursor style as a UI indicator.
    _2024.getCanvas().style.cursor = 'pointer';

    const _2020Info = _2020.queryRenderedFeatures(e.point, { layers: ['2020_results'] });
    store.setHoveredDistricts(_2020Info[0].properties, e.features[0].properties);
});

_2024.on('mouseleave', '2024_results', (e) => {

    if (swiper) return;
    if (hovered2020PolygonId !== null) {
        _2020.setFeatureState(
            { source: 'results_src', id: hovered2020PolygonId },
            { hover: false }
        );
    }
    hovered2020PolygonId = null;
    _2024.getCanvas().style.cursor = '';
    Array.from(document.getElementsByClassName('table-container')).forEach(e => e.style.display = 'none')
    Array.from(document.getElementsByClassName('ed')).forEach(e => e.innerHTML = '')
});

_2020.on('mousemove', '2020_results', (e) => {

    Array.from(document.getElementsByClassName('table-container')).forEach(e => e.style.display = 'inline-block')
    if (swiper) return;
    if (hovered2024PolygonId !== null) {
        _2024.setFeatureState(
            { source: 'results_src', id: hovered2024PolygonId },
            { hover: false }
        );
    }
    if (e.features.length > 0) {
        if (hovered2020PolygonId !== null) {
            _2020.setFeatureState(
                { source: 'results_src', id: hovered2020PolygonId },
                { hover: false }
            );
        }
        hovered2020PolygonId = e.features[0].id;
        _2020.setFeatureState(
            { source: 'results_src', id: hovered2020PolygonId },
            { hover: true }
        );
    }
    // Change the cursor style as a UI indicator.
    _2020.getCanvas().style.cursor = 'pointer';
    const _2024Info = _2024.queryRenderedFeatures(e.point, { layers: ['2024_results'] });
    store.setHoveredDistricts(_2024Info[0].properties, e.features[0].properties);
    // document.getElementsByClassName('ed').forEach(e => e.innerHTML = e.features[0].properties.aded24);

});

_2020.on('mouseleave', '2020_results', () => {
    if (swiper) return;
    if (hovered2020PolygonId !== null) {
        _2020.setFeatureState(
            { source: 'results_src', id: hovered2020PolygonId },
            { hover: false }
        );
    }
    hovered2020PolygonId = null;
    _2020.getCanvas().style.cursor = '';
    Array.from(document.getElementsByClassName('table-container')).forEach(e => e.style.display = 'none')
    Array.from(document.getElementsByClassName('ed')).forEach(e => e.innerHTML = '')

});