//////////////////////////////////////////////////
//Config Color Scale///
//////////////////////////////////////////////////
const colorScale = [
    {
        pct: 90,
        color: '#00f'
    },
    {
        pct: 80,
        color: '#20a'
    },
    {
        pct: 70,
        color: '#408'
    },
    {
        pct: 60,
        color: "#606"
    },
    {
        pct: 50,
        color: '#804',
    },
    {
        pct: 40,
        color: '#a02',
    },
    {
        pct: 30,
        color: '#e00'
    }
]

fillExp = ['case'];
colorScale.forEach((f, i) => {
    fillExp.push(['>', ['get', 'harris'], colorScale[i].pct]);
    fillExp.push(colorScale[i].color)
});
fillExp.push('rgba(0,0,0,0)')

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
//Popup///
//////////////////////////////////////////////////
const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false
});

_2024.on('mousemove', '2024_results', (e) => {
    // Change the cursor style as a UI indicator.
    _2024.getCanvas().style.cursor = 'pointer';
    console.log(e.features[0].geometry)
    const coordinates = e.features[0].geometry.coordinates[0][0].slice();
    const description = e.features[0].properties.harris;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(`Harris 2024 vote share: <br> ${description}%`).addTo(_2024);
});

_2024.on('mouseleave', '2024_results', () => {
    _2024.getCanvas().style.cursor = '';
    //popup.remove();
});

_2020.on('mousemove', '2020_results', (e) => {
    // Change the cursor style as a UI indicator.
    _2020.getCanvas().style.cursor = 'pointer';
    console.log(e.features[0].geometry)
    const coordinates = e.features[0].geometry.coordinates[0][0].slice();
    const description = e.features[0].properties.harris;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(`Biden 2020 vote share: <br> ${description}%`).addTo(_2020);
});

_2020.on('mouseleave', '2020_results', () => {
    _2020.getCanvas().style.cursor = '';
    popup.remove();
});
///////////////////////////////////////////////////
//Opacity Slider
///////////////////////////////////////////////////
const opSlider = document.getElementById('opacity-container');
opSlider.addEventListener('input', (v) => {
    _2024.setPaintProperty('2024_results', 'fill-opacity', (+v.target.value / 100))
    _2020.setPaintProperty('2020_results', 'fill-opacity', (+v.target.value / 100))
})

///////////////////////////////////////////////////
//Legend
///////////////////////////////////////////////////
const legend = document.getElementById('legend');
for (let i = 0; i < colorScale.length; i++) {
    legend.innerHTML += `
    <div class="legend-item">
        <span style="display:inline-block;width:16px; height:16px;background-color:${colorScale[i].color}"></span>
        <span class="pct">Greater than ${colorScale[i].pct}%</span>
    </div>`
}