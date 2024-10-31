///////////////////////////////////////////////////
//Opacity Slider
///////////////////////////////////////////////////
/*const opSlider = document.getElementById('opacity-container');
if(opSlider){
    opSlider.addEventListener('input', (v) => {
        _2024.setPaintProperty('2024_results', 'fill-opacity', (+v.target.value / 100))
        _2020.setPaintProperty('2020_results', 'fill-opacity', (+v.target.value / 100))
    })
}
*/

///////////////////////////////////////////////////
//Legend
///////////////////////////////////////////////////
const legend = document.getElementById('legend');
if (legend) {
    for (let i = 0; i < colorScale.length; i++) {
        legend.innerHTML += `
    <div class="legend-item">
        <span style="display:inline-block;width:16px; height:16px;background-color:${colorScale[i].color}"></span>
        <span class="pct">Greater than ${colorScale[i].pct}%</span>
    </div>`
    }
}

///////////////////////////////////////////////////
//Update UI
///////////////////////////////////////////////////
function updateUI() {
    ////////////////////////////////////////////////
    const pctBiden2020 = document.querySelector("#percents #biden-2020");
    pctBiden2020.innerHTML = getInnerHtml('Biden', store.hoveredDistricts._2020.pct.dem, true)

    const pctTrump2020 = document.querySelector("#percents #trump-2020");
    pctTrump2020.innerHTML = getInnerHtml('Trump', store.hoveredDistricts._2020.pct.gop, true)

    const pctOther2020 = document.querySelector("#percents #other-2020");
    pctOther2020.innerHTML = getInnerHtml('Other', store.hoveredDistricts._2020.pct.other, true)

    ////////////////////////////////////////////////

    const pctHarris2024 = document.querySelector("#percents #harris-2024");
    pctHarris2024.innerHTML = getInnerHtml('Harris', store.hoveredDistricts._2024.pct.dem, true)

    const pctTrump2024 = document.querySelector("#percents #trump-2024");
    pctTrump2024.innerHTML = getInnerHtml('Trump', store.hoveredDistricts._2024.pct.gop, true)

    const pctOther2024 = document.querySelector("#percents #other-2024");
    pctOther2024.innerHTML = getInnerHtml('Other', store.hoveredDistricts._2024.pct.other, true)

    ////////////////////////////////////////////////

    const demDeltaPct = document.querySelector("#percents #dem-delta");
    demDeltaPct.innerHTML = getInnerHtml('DEM', store.hoveredDistricts.delta.pct.dem.toFixed(2), true)

    const gopDeltaPct = document.querySelector("#percents #gop-delta");
    gopDeltaPct.innerHTML = getInnerHtml('GOP', store.hoveredDistricts.delta.pct.gop.toFixed(2), true)

    const otherDeltaPct = document.querySelector("#percents #other-delta");
    otherDeltaPct.innerHTML = getInnerHtml('Other', store.hoveredDistricts.delta.pct.other.toFixed(2), true)

    ////////////////////////////////////////////////

    const numBiden2020 = document.querySelector("#numbers #biden-2020");
    numBiden2020.innerHTML = getInnerHtml('Biden', Math.round(store.hoveredDistricts._2020.numVotes.dem, false))

    const numTrump2020 = document.querySelector("#numbers #trump-2020");
    numTrump2020.innerHTML = getInnerHtml('Trump', Math.round(store.hoveredDistricts._2020.numVotes.gop, false))

    const numOther2020 = document.querySelector("#numbers #other-2020");
    numOther2020.innerHTML = getInnerHtml('Other', Math.round(store.hoveredDistricts._2020.numVotes.other, false))

    ////////////////////////////////////////////////

    const numHarris2024 = document.querySelector("#numbers #harris-2024");
    numHarris2024.innerHTML = getInnerHtml('Harris', Math.round(store.hoveredDistricts._2024.numVotes.dem, false))

    const numTrump2024 = document.querySelector("#numbers #trump-2024");
    numTrump2024.innerHTML = getInnerHtml('Trump', Math.round(store.hoveredDistricts._2024.numVotes.gop, false))

    const numOther2024 = document.querySelector("#numbers #other-2024");
    numOther2024.innerHTML = getInnerHtml('Other', Math.round(store.hoveredDistricts._2024.numVotes.other, false))

    ////////////////////////////////////////////////

    const demDelta = document.querySelector("#numbers #dem-delta");
    demDelta.innerHTML = getInnerHtml('DEM', Math.round(store.hoveredDistricts.delta.numVotes.dem.toFixed(2), false))

    const gopDelta = document.querySelector("#numbers #gop-delta");
    gopDelta.innerHTML = getInnerHtml('GOP', Math.round(store.hoveredDistricts.delta.numVotes.gop.toFixed(2), false))

    const otherDelta = document.querySelector("#numbers #other-delta");
    otherDelta.innerHTML = getInnerHtml('Other', Math.round(store.hoveredDistricts.delta.numVotes.other, false))

    ////////////////////////////////////////////////

    const delta2020 = document.querySelector("#numbers #dem-delta");
    delta2020.innerHTML = getInnerHtml('DEM', Math.round(store.hoveredDistricts.delta.numVotes.dem.toFixed(2), false))

    const delta2024 = document.querySelector("#numbers #gop-delta");
    delta2024.innerHTML = getInnerHtml('GOP', Math.round(store.hoveredDistricts.delta.numVotes.gop.toFixed(2), false))

    const deltaOther = document.querySelector("#numbers #other-delta");
    deltaOther.innerHTML = getInnerHtml('Other', Math.round(store.hoveredDistricts.delta.numVotes.other, false))
    ////////////////////////////////////////////////
    const total2020Num = document.querySelector("#numbers #total-2020");
    total2020Num.innerHTML = getInnerHtml('Total', Math.round(store.hoveredDistricts._2020.numVotes.total, false))

    const total2024Num = document.querySelector("#numbers #total-2024");
    total2024Num.innerHTML = getInnerHtml('Total', Math.round(store.hoveredDistricts._2024.numVotes.total, false))

    const totalDeltaNum = document.querySelector("#numbers #total-delta");
    totalDeltaNum.innerHTML = getInnerHtml('Total', Math.round(store.hoveredDistricts._2024.numVotes.total + store.hoveredDistricts._2020.numVotes.total, false))
}

function getInnerHtml(title, value, _pct) {
    return `<span style="float:left">${title}</span><span style="float:right">${value}${_pct ? '%' : ''}</span>`
}