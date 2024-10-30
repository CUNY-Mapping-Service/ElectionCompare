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